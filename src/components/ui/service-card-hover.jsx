import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const ServiceHoverEffect = ({ items, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 pb-12", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group block h-full w-full pb-2 pr-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: idx * 0.1,
            ease: "easeOut"
          }}
        >
          <Card>
            {item.number && <CardNumber>{item.number}</CardNumber>}
            {item.icon && <CardIcon>{item.icon}</CardIcon>}
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
              {item.description && <CardDescription>{item.description}</CardDescription>}
              {item.capabilities && item.capabilities.length > 0 && (
                <CardCapabilities capabilities={item.capabilities} label={item.capabilitiesLabel} />
              )}
            </CardContent>
            <CardCTA href={item.ctaHref || "#contact"}>
              {item.ctaText || "Learn More"}
            </CardCTA>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg h-full w-full p-5 bg-white/5 backdrop-blur-sm border-2 border-white/30 hover:border-cyan-400/60 relative z-10 transition-all duration-300 flex flex-col items-start text-left gap-4 group-hover:translate-x-[2px] group-hover:translate-y-[2px]",
        className
      )}
      style={{
        boxShadow: '8px 8px 0px rgba(34, 211, 238, 1)',
        transition: 'all 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '6px 6px 0px rgba(34, 211, 238, 1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '8px 8px 0px rgba(34, 211, 238, 1)';
      }}
    >
      {children}
    </div>
  );
};

export const CardNumber = ({ className, children }) => {
  return (
    <div className={cn("absolute top-6 right-6 text-7xl font-bold font-inter leading-none", className)}>
      <div className="relative">
        {/* Static number - always visible */}
        <span className="bg-gradient-to-br from-cyan-400/[0.06] to-purple-600/[0.04] bg-clip-text text-transparent group-hover:opacity-0 transition-opacity duration-500">
          {children}
        </span>
        {/* Animated gradient on hover */}
        <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent animate-gradient transition-opacity duration-500 bg-[length:200%_200%]">
          {children}
        </span>
      </div>
    </div>
  );
};

export const CardIcon = ({ className, children }) => {
  return (
    <div className={cn("w-14 h-14 rounded-lg bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center text-cyan-300 [&>svg]:w-7 [&>svg]:h-7", className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return (
    <div className={cn("relative z-10 flex flex-col gap-3.5 flex-1", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h3 className={cn("text-2xl font-bold text-white font-inter m-0 leading-tight flex-shrink-0", className)}>
      {children}
    </h3>
  );
};

export const CardSubtitle = ({ className, children }) => {
  return (
    <p className={cn("text-sm text-cyan-400 m-0 font-semibold leading-snug flex-shrink-0", className)}>
      {children}
    </p>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("text-sm text-gray-400 leading-relaxed flex-1", className)}>
      {children}
    </p>
  );
};

export const CardCapabilities = ({ capabilities, label = "Key Capabilities", className }) => {
  return (
    <div className={cn("space-y-3 border-t border-white/10 pt-4 flex-shrink-0", className)}>
      <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {capabilities.slice(0, 4).map((cap, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs text-gray-300"
          >
            <span className="text-cyan-400 mt-0.5">•</span>
            <span className="leading-tight">{cap.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardCTA = ({ className, href = "#", children }) => {
  return (
    <a
      href={href}
      className={cn(
        "group/cta inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors duration-300 mt-auto",
        className
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
    </a>
  );
};
