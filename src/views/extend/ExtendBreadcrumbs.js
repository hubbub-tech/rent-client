import { printDate } from '../utils.js';

export const ExtendBreadcrumbs = ({ order }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><a href="/orders/history">Rentals</a></li>
        <li className="breadcrumb-item">{ printDate(order.res_dt_start) } - { printDate(order.res_dt_end) }</li>
        {order.extensions.map((extension, index) => (
          <li
            key={extension.res_dt_end}
            className={`breadcrumb-item ${index === order.extensions.length - 1 ? 'active' : ''}`}
            aria-current="page"
          >
            extended to { printDate(extension.res_dt_end) }
          </li>
        ))}
      </ol>
    </nav>
  );
}
