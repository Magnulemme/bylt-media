import VerticalLinesCanvas from '@/components/services/sections/VerticalLinesCanvas';
import { MovingBorderButton } from '@/components/ui/moving-border-button';

const CTASectionCard = ({
  title = "Ready to Work Together?",
  description = "Let's discuss how we can help grow your business with data-driven digital marketing.",
  buttonText = "Get Free Audit",
  buttonHref,
  onButtonClick,
  dotScale = 0.8,
  background = '#020617',
  variant = "default",
  className = "",
}) => {
  const buttonProps = buttonHref
    ? { as: "a", href: buttonHref }
    : { type: "button", onClick: onButtonClick };

  const isSoft = variant === "soft";

  return (
    <section
      className={`${isSoft ? '' : 'py-12 lg:py-24 max-sm:pb-24'} relative overflow-hidden ${className}`}
      style={{
        background,
        zIndex: 10
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative ${isSoft ? 'rounded-2xl' : 'rounded-3xl border border-slate-800 overflow-hidden'}`}>
          {!isSoft && <VerticalLinesCanvas dotScale={dotScale} />}

          <div className="relative z-10 p-8 lg:p-12 text-center">
            <h2 className={`${isSoft ? 'heading-h2' : 'heading-h1'} text-white mb-6`}>
              {title}
            </h2>
            <p className="text-subheader mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            <div className="flex justify-center w-full pt-8 pb-8">
              <MovingBorderButton
                borderRadius="0.75rem"
                containerClassName="min-w-[240px] h-16"
                borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                className="border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed bg-slate-950"
                duration={2500}
                {...buttonProps}
              >
                {buttonText}
              </MovingBorderButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionCard;
