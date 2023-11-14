import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventApi from "../api/api";
import CategoryCard from "./CategoryCard";
import LoadingSpinner from "../common/LoadingSpinner";
import useSort from "../hooks/useSort"; // Import the useSort hook

function CategoryList() {
  console.debug("CategoryList");

  const { categoryName } = useParams(); // Extract category name from route parameters
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allCategories = await EventApi.getEventsByCategory(categoryName);
        setCategories(allCategories);
        console.log("API Response:", allCategories);
      } catch (error) {
        console.error("Error while fetching events:", error);
        setCategories([]);
      }
    }

    fetchData();
  }, [categoryName]);

  const {
    sortedData: sortedCategories,
    sortOrder,
    handleSortChange,
  } = useSort(categories, "");

  if (!sortedCategories) return <LoadingSpinner />;
  return (
    <div className="CategoryList col-md-8 offset-md-2">
      <div>
        <label>Sort by: </label>
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="AtoZ">A to Z</option>
          <option value="ZtoA">Z to A</option>
        </select>
      </div>
      {sortedCategories.length ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {sortedCategories.map((c) => (
            <CategoryCard
              key={c.id}
              id={c.id}
              name={c.name}
              url={c.url}
              images={c.images}
              category={c.category}
              startDate={c.startDate}
              city={c.city}
              state={c.state}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CategoryList;
