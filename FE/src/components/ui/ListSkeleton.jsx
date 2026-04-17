import React from "react";
import Skeleton from "./Skeleton";

const ListSkeleton = () => {
  return (
    <table className="startup-table mb-4">
      <thead className="startup-table-head">
        <tr>
          {Array.from({ length: 7 }).map((_, i) => (
            <th key={i}>
              <Skeleton className="text medium" />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr className="startup-table-dummy"></tr>
      </tbody>

      <tbody className="startup-table-body">
        {Array.from({ length: 5 }).map((_, i) => (
          <tr key={i} className="startup-table-row">
            <td>
              <Skeleton className="text short" />
            </td>
            <td className="company-cell">
              <Skeleton className="avatar" />
              <Skeleton className="text medium" />
            </td>
            <td className="desc-cell">
              <Skeleton className="text long" />
            </td>
            <td>
              <Skeleton className="text short" />
            </td>
            <td>
              <Skeleton className="text medium" />
            </td>
            <td>
              <Skeleton className="text medium" />
            </td>
            <td>
              <Skeleton className="text short" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListSkeleton;
