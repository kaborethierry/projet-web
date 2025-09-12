import './CategoryFilter.css'

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter