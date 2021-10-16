import React, { useState } from 'react';

import { MENU_ITEMS as items } from '../../globals';

import MenuItem from './MenuItem/MenuItem';

const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const changeActiveIndex = (index) => setActiveIndex(index);

  return (
    <div className="menu">
      <div className="menu__list">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            question={item.question}
            answer={item.answer}
            index={index}
            activeIndex={activeIndex}
            handleClick={changeActiveIndex.bind(null, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
