import React from 'react';
import { SectionHeader, SectionTitle, SectionIntro } from './section-headers';

/**
 * SectionHeadersShowcase
 *
 * Componente di esempio che mostra tutti i casi d'uso dei componenti header.
 * Usa questo file come riferimento per vedere tutte le opzioni disponibili.
 */
const SectionHeadersShowcase = () => {
  return (
    <div className="min-h-dvh bg-slate-950 py-20 space-y-32">
      {/* ========================================
          SECTION 1: SectionHeader Examples
      ======================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          SectionHeader Examples
        </h1>

        <div className="space-y-12">
          {/* Example 1: Basic tag */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-4">Basic with tag:</p>
            <SectionHeader title="Our Services" tag="Performance" align="left" />
          </div>

          {/* Example 2: Center aligned */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-4">Center aligned:</p>
            <SectionHeader title="Case Studies" tag="Results" align="center" />
          </div>

          {/* Example 3: Without tag */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-4">Without tag:</p>
            <SectionHeader title="Latest Updates" align="left" />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: SectionTitle Examples
      ======================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          SectionTitle Examples
        </h1>

        <div className="space-y-16">
          {/* Example 1: Blur variant */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Blur variant (default):</p>
            <SectionTitle
              title="A synergistic approach to digital dominance"
              subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive results"
              variant="blur"
            />
          </div>

          {/* Example 2: Scroll reveal */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Scroll reveal (word by word):</p>
            <SectionTitle
              title="Our proven process ensures clarity efficiency and exceptional results"
              subtitle="Every stage is designed to deliver measurable impact"
              variant="scroll-reveal"
            />
          </div>

          {/* Example 3: Fade variant */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Fade variant:</p>
            <SectionTitle
              title="Real Results from Real Partners"
              subtitle="See why leading brands trust us to drive their growth"
              variant="fade"
              align="left"
              size="xl"
            />
          </div>

          {/* Example 4: Different sizes */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Size variations:</p>
            <div className="space-y-8">
              <SectionTitle title="Extra Large Title" size="xl" variant="none" />
              <SectionTitle title="Large Title (Default)" size="lg" variant="none" />
              <SectionTitle title="Medium Title" size="md" variant="none" />
              <SectionTitle title="Small Title" size="sm" variant="none" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: SectionIntro Examples
      ======================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          SectionIntro Examples (All-in-One)
        </h1>

        <div className="space-y-16">
          {/* Example 1: Complete intro with tag */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Complete with tag:</p>
            <SectionIntro
              tag="Services"
              tagLabel="What We Do"
              title="A synergistic approach to digital dominance"
              subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
              variant="blur"
              maxWidth="5xl"
            />
          </div>

          {/* Example 2: Without tag, left aligned */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Without tag, left aligned:</p>
            <SectionIntro
              title="Real Results from Real Partners"
              subtitle="See why leading brands trust us to drive their growth. Ready to join them?"
              align="left"
              maxWidth="3xl"
              size="xl"
              variant="fade"
              spacing="md"
            />
          </div>

          {/* Example 3: Minimalist */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Minimalist:</p>
            <SectionIntro
              title="Our Process"
              subtitle="Every stage designed for impact"
              size="md"
              maxWidth="lg"
              spacing="sm"
            />
          </div>

          {/* Example 4: Different max widths */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8">Max width variations:</p>
            <div className="space-y-12">
              <SectionIntro
                title="Full Width Title"
                subtitle="Spans the entire container width"
                maxWidth="full"
                variant="none"
              />
              <SectionIntro
                title="5XL Width Title"
                subtitle="Very wide for large sections"
                maxWidth="5xl"
                variant="none"
              />
              <SectionIntro
                title="2XL Width Title (Default)"
                subtitle="Optimal for readability"
                maxWidth="2xl"
                variant="none"
              />
              <SectionIntro
                title="MD Width Title"
                subtitle="Narrow for compact sections"
                maxWidth="md"
                variant="none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: Real World Use Cases
      ======================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Real World Use Cases
        </h1>

        <div className="space-y-16">
          {/* Use case 1: Services section */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8 font-mono">Use case: Services Section</p>
            <SectionIntro
              title="A synergistic approach to digital dominance"
              subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
              variant="blur"
              maxWidth="5xl"
            />
            <div className="mt-8 p-4 bg-slate-800/50 rounded text-gray-400 text-sm font-mono">
              {`<SectionIntro
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy..."
  variant="blur"
  maxWidth="5xl"
/>`}
            </div>
          </div>

          {/* Use case 2: Process timeline */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8 font-mono">Use case: Process Timeline</p>
            <SectionIntro
              title="Our proven process ensures clarity, efficiency, and exceptional results"
              subtitle="Every stage is designed to deliver measurable impact, from strategy to scale"
              variant="scroll-reveal"
              maxWidth="5xl"
            />
            <div className="mt-8 p-4 bg-slate-800/50 rounded text-gray-400 text-sm font-mono">
              {`<SectionIntro
  title="Our proven process ensures..."
  subtitle="Every stage is designed..."
  variant="scroll-reveal"
  maxWidth="5xl"
/>`}
            </div>
          </div>

          {/* Use case 3: Testimonials */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8 font-mono">Use case: Testimonials/Success Stories</p>
            <SectionIntro
              title="Real Results from Real Partners"
              subtitle="See why leading brands trust us to drive their growth. Ready to join them?"
              align="left"
              maxWidth="3xl"
              size="xl"
              variant="blur"
            />
            <div className="mt-8 p-4 bg-slate-800/50 rounded text-gray-400 text-sm font-mono">
              {`<SectionIntro
  title="Real Results from Real Partners"
  subtitle="See why leading brands trust us..."
  align="left"
  maxWidth="3xl"
  size="xl"
  variant="blur"
/>`}
            </div>
          </div>

          {/* Use case 4: Small section with tag */}
          <div className="bg-slate-900/50 p-8 rounded-lg">
            <p className="text-gray-400 text-sm mb-8 font-mono">Use case: Tagged Section</p>
            <SectionIntro
              tag="Portfolio"
              tagLabel="Our Work"
              title="Featured Projects"
              subtitle="Explore our latest digital transformations"
              size="md"
              maxWidth="lg"
              spacing="sm"
            />
            <div className="mt-8 p-4 bg-slate-800/50 rounded text-gray-400 text-sm font-mono">
              {`<SectionIntro
  tag="Portfolio"
  tagLabel="Our Work"
  title="Featured Projects"
  subtitle="Explore our latest digital transformations"
  size="md"
  maxWidth="lg"
  spacing="sm"
/>`}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionHeadersShowcase;
