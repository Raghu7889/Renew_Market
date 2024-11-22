import { MenuFoldOutlined } from "@ant-design/icons";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
  {
    name: "Toy",
    value: "toy",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "12-20",
  },
];

function Filters({
  showFilters,
  setShowFilters,
  filters = { category: [], age: [] },
  setFilters,
}) {
  return (
    <div className="border5 p-3 flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl text-orange-600">Filters</h1>
        <MenuFoldOutlined
          className="text-xl cursor-pointer hover:text-red-600"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600 text-lg">Categories</h1>

        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <div>
          <h1 className="text-gray-600 text-lg mt-5">Ages</h1>
          <div className="flex flex-col">
            {ages.map((age) => {
              return (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="age"
                    className="max-width"
                    checked={filters.age.includes(age.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          age: [...filters.age, age.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          age: filters.age.filter((item) => item !== age.value),
                        });
                      }
                    }}
                  />
                  <label htmlFor="age">{age.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
