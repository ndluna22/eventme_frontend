import { useState, useEffect } from "react";

function useSort(initialData, initialSortOrder = "AtoZ") {
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [sortedData, setSortedData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      const sorted = [...initialData];
      if (sortOrder === "AtoZ") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "ZtoA") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      }
      setSortedData(sorted);
    }
  }, [initialData, sortOrder]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return { sortedData, sortOrder, handleSortChange };
}

export default useSort;
