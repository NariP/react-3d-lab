import { ReactNode } from 'react';

interface Props {
  className?: string;
  views: { title: string; desc?: ReactNode }[];
  viewId: number;
  onChangeView: (currentView: number) => void;
}

const gridClassName = 'grid grid-cols-1 md:grid-cols-3 gap-4';

const ViewSelects = ({ views, className, viewId, onChangeView }: Props) => {
  return (
    <ul className={`bg-gray-100 rounded-md px-4 py-2 ${gridClassName} ${className}`}>
      {views.map((view, index) => {
        return (
          <li
            key={index}
            data-active={viewId === index + 1}
            className="p-2 bg-gray-50 rounded-md data-[active=true]:border border-green-600 cursor-pointer hover:bg-gray-200"
            onClick={() => {
              onChangeView(index + 1);
            }}
          >
            <strong className="font-semibold text-base">
              {index + 1}. {view.title}
            </strong>
            <p className="text-sm mt-1 indent-2">{view.desc}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ViewSelects;
