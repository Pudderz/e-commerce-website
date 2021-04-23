import React, { useRef, useEffect } from "react";
import {
  SlideContainer,
  Slide,
  Wrapper,
  Buttons,
} from "./TextSlider.styles";

const THRESHOLD = 100;

export const TextSlider = () => {
  const sliderRef = useRef(null);
  const slidesRef = useRef(null);
  const posX1 = useRef(0);
  const posX2 = useRef(0);
  const posInitial = useRef(100);
  const posFinal = useRef(100);
  const slidesLength = useRef(null);
  const slideSize = useRef(null);
  const allowShift = useRef(true);
  const index = useRef(0);

  //prevents dragAction from firing when user is not dragging
  const dragging = useRef(false);

  //canDrag prevents user from dragging the text during animations( dragEnd to transitionEnd )
  const canDrag = useRef(true);

  const shiftSlide = (dir, action) => {
    console.log("shifting");
    slidesRef.current.classList.add("shifting");

    if (allowShift.current) {
      if (!action) {
        posInitial.current = slidesRef.current.offsetLeft;
      }

      if (dir == 1) {
        slidesRef.current.style.left =
          posInitial.current - slideSize.current + "px";
        index.current++;
      } else if (dir == -1) {
        slidesRef.current.style.left =
          posInitial.current + slideSize.current + "px";
        index.current--;
      }
    }

    allowShift.current = false;
  };

  const handleNext = (e) => shiftSlide(-1);
  const handlePrevious = (e) => shiftSlide(1);


  const dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    if (!canDrag.current) return;
    posInitial.current = slidesRef.current.offsetLeft;
    dragging.current = true;
    if (e.type == "touchstart") {
      posX1.current = e.touches[0].clientX;
    } else {
      posX1.current = e.clientX;
    }
  };

  function dragAction(e) {
    if (!dragging.current) return;
    e = e || window.event;
    if (e.type == "touchmove") {
      posX2.current = posX1.current - e.touches[0].clientX;
      posX1.current = e.touches[0].clientX;
    } else {
      posX2.current = posX1.current - e.clientX;
      posX1.current = e.clientX;
    }
    slidesRef.current.style.left =
      slidesRef.current.offsetLeft - posX2.current + "px";
  }

  const dragEnd = (e) => {
    if (dragging.current == false) return;
    canDrag.current = false;
    dragging.current = false;
    console.log("dragEnd");
    posFinal.current = slidesRef.current.offsetLeft;
    // completes the slide left or right once drag has ended
    if (posFinal.current - posInitial.current < -THRESHOLD) {
      shiftSlide(1, "drag");
    } else if (posFinal.current - posInitial.current > THRESHOLD) {
      shiftSlide(-1, "drag");
    } else {
      slidesRef.current.style.left = posInitial.current + "px";
      canDrag.current = true;
    }
  };

  const checkIndex = () => {
    slidesRef.current.classList.remove("shifting");
    canDrag.current = true;
    if (index.current == -1) {
      slidesRef.current.style.left =
        -(slidesLength.current * slideSize.current) + "px";
      index.current = slidesLength.current - 1;
    }

    if (index.current == slidesLength.current) {
      slidesRef.current.style.left = -(1 * slideSize.current) + "px";
      index.current = 0;
    }

    allowShift.current = true;
  };

  useEffect(() => {
    slidesLength.current = slidesRef.current.children.length;
    slideSize.current = slidesRef.current.children[0].offsetWidth;
    slidesRef.current.style.left =
          -1 * (index.current * slideSize.current + slideSize.current) + "px";
    let firstSlide = slidesRef.current.children[0];
    let lastSlide = slidesRef.current.children[slidesLength.current - 1];
    let cloneFirst = firstSlide.cloneNode(true);
    let cloneLast = lastSlide.cloneNode(true);
    slidesRef.current.appendChild(cloneFirst);
    slidesRef.current.insertBefore(cloneLast, firstSlide);

    window.addEventListener("resize", (e) => {
      slidesRef.current.classList.remove("shifting");
      slidesLength.current = slidesRef.current.children.length;
      slideSize.current = slidesRef.current.children[0].offsetWidth;
      slidesRef.current.style.left =
        -1 * (index.current * slideSize.current + slideSize.current) + "px";
    });

    return () => {
      window.removeEventListener("resize", (e) => {
        slidesRef.current.classList.remove("shifting");
        slidesLength.current = slidesRef.current.children.length;
        slideSize.current = slidesRef.current.children[0].offsetWidth;
        slidesRef.current.style.left =
          -1 * (index.current * slideSize.current + slideSize.current) + "px";
      });
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div id="slider" className="slider" ref={sliderRef}>
        <Wrapper>
          <SlideContainer
            className="slides"
            ref={slidesRef}
            onMouseDown={dragStart}
            onMouseUp={dragEnd}
            onMouseMove={dragAction}
            onTouchStart={dragStart}
            onTouchEnd={dragEnd}
            onTouchMove={dragAction}
            onTransitionEnd={checkIndex}
            onPointerLeave={dragEnd}
          >
            <Slide>30 Days return policy</Slide>
            <Slide>Free Delivery</Slide>
            <Slide>Up to 50% off certain products</Slide>
          </SlideContainer>
        </Wrapper>
        <Buttons
          id="prev"
          className={"control prev"}
          onClick={handleNext}
        ></Buttons>
        <Buttons
          id="next"
          className={"control next"}
          onClick={handlePrevious}
        ></Buttons>

      </div>
    </div>
  );
};

export default TextSlider;
