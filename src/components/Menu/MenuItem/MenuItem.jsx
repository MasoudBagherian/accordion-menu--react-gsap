import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { IoIosArrowDroprightCircle as ArrowIcon } from 'react-icons/io';
import { gsap } from 'gsap';

const DURATION = 0.2;

const MenuItem = (props) => {
  const answerRef = useRef();
  const heightRef = useRef();
  const arrowRef = useRef();
  useEffect(() => {
    if (props.activeIndex === null) {
      return;
    }
    if (props.index !== props.activeIndex) {
      slideUp();
    }
  }, [props.activeIndex]);
  useLayoutEffect(() => {
    init();
  }, []);
  const getHeight = () => {
    const height = answerRef.current.offsetHeight;
    heightRef.current = height;
  };
  const initAnswer = () => {
    gsap.set(answerRef.current, { height: 0, padding: '0 2rem' });
  };
  const init = () => {
    getHeight();
    initAnswer();
  };
  const slideDown = () => {
    const tl = gsap.timeline();
    tl.to(arrowRef.current, DURATION, {
      rotation: 90,
    });
    tl.to(answerRef.current, 0.4, {
      paddingTop: '2rem',
      paddingBottom: '2rem',
      height: `${heightRef.current}px`,
      ease: 'power1.out',
    });
    tl.set(answerRef.current, { overflowY: 'auto' });
  };
  const slideUp = () => {
    const tl = gsap.timeline();
    tl.set(answerRef.current, { overflowY: 'hidden' });
    tl.to(answerRef.current, 0.4, {
      paddingTop: 0,
      paddingBottom: 0,
      height: 0,
      ease: 'power1.in',
    });
    tl.to(arrowRef.current, DURATION, {
      rotation: 0,
    });
  };
  const handleMenuClick = () => {
    setTimeout(() => {
      handleMenuToggle();
    }, DURATION * 1000);
    props.handleClick();
  };
  const handleMenuToggle = () => {
    if (answerRef.current.offsetHeight === 0) {
      slideDown();
    } else {
      slideUp();
    }
  };
  return (
    <div className="menu__item">
      <div className="menu__heading" onClick={handleMenuClick}>
        <div className="menu__arrow" ref={arrowRef}>
          <ArrowIcon />
        </div>
        <div className="menu__question">{props.question}</div>
      </div>
      <div className="menu__answer" ref={answerRef}>
        {props.answer}
      </div>
    </div>
  );
};

export default MenuItem;
