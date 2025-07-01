import React from 'react';
import Hero from '../Hero/Hero';
import NoticeBoard from '../Notice/NoticeBoard';
import FeaturedCourses from '../Courses/FeaturedCourses';
import SuccessStories from '../Success/SuccessStories';

export default function Home() {
  return (
    <div>
      <Hero />
      <NoticeBoard />
      <FeaturedCourses />
      <SuccessStories />
    </div>
  );
}
