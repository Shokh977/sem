import React from 'react';
import Hero from '../Hero/Hero';
import NoticeBoard from '../Notice/NoticeBoard';
import SuccessStories from '../Success/SuccessStories';

export default function Home() {
  return (
    <div>
      <Hero />
      <NoticeBoard />
      <SuccessStories />
    </div>
  );
}
