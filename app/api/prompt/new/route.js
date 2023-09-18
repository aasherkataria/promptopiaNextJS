import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new NextResponse({ newPrompt, status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse({ error, status: 500 });
  }
};
