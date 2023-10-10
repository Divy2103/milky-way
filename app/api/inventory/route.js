import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/connection";
import Product from "../../../database/schema/Product";
import Category from "../../../database/schema/Category";
import { storage } from "../../../firebase.config";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

connect();

const uploadImage = async (image) => {
  const date = new Date();
  const imageRef = ref(storage, `inventory/${image.name}.${date}`);
  const imageBytes = await image.arrayBuffer();
  const imageMetadata = {
    contentType: image.type,
  };
  const imageSnapshot = await uploadBytesResumable(
    imageRef,
    imageBytes,
    imageMetadata
  );
  const uri = await getDownloadURL(imageSnapshot.ref);
  return uri;
};

const deleteImage = async (name) => {
  const imageRef = ref(storage, name);
  await deleteObject(imageRef);
};

export async function POST(request, response) {
  try {
    const data = await request.formData();

    const name = data.get("name");
    const category = data.get("category");
    const image = data.get("image");
    const description = data.get("description");
    const mrp = data.get("mrp");
    const sellingPrice = data.get("sellingPrice");
    const bulletPoints = data.getAll("bulletPoints");

    console.log({ name, category, image, description, mrp, sellingPrice });

    if (
      !name ||
      !category ||
      !image ||
      !description ||
      !mrp ||
      !sellingPrice ||
      !bulletPoints
    ) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const uri = await uploadImage(image);

    const newProduct = new Product({
      name,
      category,
      image: uri,
      description,
      mrp,
      sellingPrice,
      bulletPoints,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request, response) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (id) {
      const data = Product.findById(id);
      const product = await data.populate("category").exec();
      return NextResponse.json({ product });
    }

    const products = await Product.find();

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, response) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    const product = await Product.findById(id);

    const imageUri = product.image;
    await deleteImage(imageUri);

    const data = await request.formData();

    const name = data.get("name");
    const category = data.get("category");
    const image = data.get("image");
    const description = data.get("description");
    const mrp = data.get("mrp");
    const sellingPrice = data.get("sellingPrice");

    const bulletPoints = data.getAll("bulletPoints");

    if (
      !name ||
      !category ||
      !image ||
      !description ||
      !mrp ||
      !sellingPrice ||
      !bulletPoints
    ) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const uri = await uploadImage(image);

    const newProduct = {
      name,
      category,
      image: uri,
      description,
      mrp,
      sellingPrice,
      bulletPoints,
    };

    await Product.findByIdAndUpdate(id, newProduct, { new: true });

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, response) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    const product = await Product.findById(id);
    const imageUri = product.image;
    await deleteImage(imageUri);

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
