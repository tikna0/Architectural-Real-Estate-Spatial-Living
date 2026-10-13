import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/properties';
import { sound } from '../utils/audio';

export const ArchitectureJournal: React.FC = () => {
  return (
    <section id="journal" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Title */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Spatial Thought & Essays</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
          The PixelRooms Journal
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#6E6E73] max-w-xl">
          Essays on acoustic engineering, daylight mechanics, and honest materiality in contemporary living spaces.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDITORIAL_ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => sound.playClick()}
            className="group p-6 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Clean unboxed metadata (anti-slop rule) */}
              <div className="flex items-center gap-2 text-xs text-[#6E6E73] mb-3">
                <span className="font-semibold text-[#0071E3]">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="mt-3 text-xs text-[#515154] leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2F2F7] flex items-center justify-between text-xs font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              <span>Read Essay</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
