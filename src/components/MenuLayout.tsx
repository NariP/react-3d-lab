import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const MenuLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="size-full p-6">
      <ul className="flex flex-wrap divide-x">
        {chapters.map(chapter => (
          <li key={chapter.pathname}>
            <NavLink
              to={chapter.pathname}
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 hover:bg-gray-50 rounded-2 font-semibold text-green-500'
                  : 'px-4 py-2 hover:bg-gray-50 rounded-2 font-semibold'
              }
            >
              {chapter.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="size-full mt-6">{children}</div>
    </section>
  );
};

const chapters = [
  { label: 'chapter1', pathname: '/chapter-1' },
  { label: 'chapter2', pathname: '/chapter-2' },
];

export default MenuLayout;
