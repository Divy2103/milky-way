import { NextRequest, NextResponse } from "next/server";
import connect from "../../../database/connection";
import Category from "../../../database/schema/Category";

connect();

export async function POST(request, response) {
  try {
    const data = await request.json();

    const { name, description } = data;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const category = await Category.findOne({ name });

    if (category) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request, response) {
  try {
    const categories = await Category.find();

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, response) {
  try {
    const data = await request.json();
    const { name, description } = data;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Please add all the fields" },
        { status: 400 }
      );
    }

    const category = await Category.findOne({ name });

    if (!category) {
      return NextResponse.json(
        { error: "Category does not exists" },
        { status: 400 }
      );
    }

    await Category.findOneAndUpdate({ name }, { description });

    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, response) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id not found" });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category does not exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
