import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScroll = () => {
  const heroRef = useRef(null);
  const orbRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const sideLeftRef = useRef([]);
  const sideRightRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1700",
          scrub: 1.2,
          pin: true,
        },
      });

       //BOB diagonal movement//
      tl.to(orbRef.current, {
        x: 900,
        y: -520,
        scale: 1.6,
        ease: "none",
      });

      //  EXplosion
      tl.to(orbRef.current, {
        scale: 30,
        opacity: 1,
        ease: "power2.out",
      });

      // Screen pop-up
      tl.to(overlayRef.current, {
        opacity: 1,
        ease: "power2.out",
      });

      // Title poppping
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 100, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );

      // Left stats
      tl.from(
        sideLeftRef.current,
        {
          opacity: 0,
          x: -80,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Right stats
      tl.from(
        sideRightRef.current,
        {
          opacity: 0,
          x: 80,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full bg-black relative overflow-hidden flex items-center justify-center"
    >
      {/* ⚪ Light Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-white opacity-0"
      />

      {/* Main Title */}
      <h1
        ref={textRef}
        className="opacity-0 text-5xl md:text-7xl font-bold tracking-[0.35em] text-center text-black relative z-10">
        WELCOME TO ITZFIZZ
      </h1>

      {/* LEFT SIDE STATS */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-10 z-10">
        {[
          { value: "120%", label: "Growth" },
          { value: "98%", label: "Satisfaction" },
          { value: "24/7", label: "Support" },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (sideLeftRef.current[i] = el)}
            className="text-left"
          >
            <p className="text-3xl font-semibold text-black">
              {item.value}
            </p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/*  RIGHT SIDE STATS */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-10 z-10 text-right">
        {[
          { value: "300+", label: "Projects" },
          { value: "50+", label: "Clients" },
          { value: "10 yrs", label: "Experience" },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => (sideRightRef.current[i] = el)}
          >
            <p className="text-3xl font-semibold text-black">
              {item.value}
            </p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/*  Glowing BOB */}
      <div
        ref={orbRef}
        className="absolute bottom-[-60px] left-[-60px] w-28 h-28 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #60a5fa 0%, #2563eb 40%, transparent 70%)",
          boxShadow:
            "0 0 120px #3b82f6, 0 0 220px #3b82f6",
        }}
      />
    </section>
  );
};

export default HeroScroll;