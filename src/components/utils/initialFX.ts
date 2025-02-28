// import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import SplitType, { SplitTypeOptions } from 'split-type';

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = new SplitType(document.querySelectorAll(".landing-info h3, .landing-intro h2, .landing-intro h1"), {
    types: ['chars', 'lines'],
    lineClass: 'split-line'
  });

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps: Partial<SplitTypeOptions> = { 
    types: ['chars', 'lines'] as ('chars' | 'lines' | 'words')[],
    lineClass: 'split-h2' 
  };

  const landingText2El = document.querySelector(".landing-h2-info") as HTMLElement;
  const landingText3El = document.querySelector(".landing-h2-info-1") as HTMLElement;
  const landingText4El = document.querySelector(".landing-h2-1") as HTMLElement;
  const landingText5El = document.querySelector(".landing-h2-2") as HTMLElement;

  if (!landingText2El || !landingText3El || !landingText4El || !landingText5El) return;

  const landingText2 = new SplitType(landingText2El, TextProps);
  const landingText3 = new SplitType(landingText3El, TextProps);
  const landingText4 = new SplitType(landingText4El, TextProps);
  const landingText5 = new SplitType(landingText5El, TextProps);

  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitType, Text2: SplitType) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
