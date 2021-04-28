
const initialFilterState = {
    male: false,
    female: false,
    unisex: false,
    under100: false,
    between100And150: false,
    over150: false,
    running: false,
    hiking: false,
    casual: false,
    discounted: false,
}


// TODO loop through urlParams or Promise.all them to speed up the process,
//  reduce code and make it more readable
export const getFilterSearchQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const variables = {};
  const filterState = {...initialFilterState};
  let stock =[];  
  const searchParam = urlParams.get("search");
  console.log(urlParams.toString());
  if (searchParam) variables.search = searchParam;

  const sizes = urlParams.get("sizes");

  if (sizes) {
    let sizesFilter = decodeURIComponent(sizes)
      .split(",")
      .map((x) => +x);
    console.log(sizesFilter);
    variables.stockSize = sizesFilter;
    stock = sizesFilter;
  }

  const discounted = urlParams.get("discounted");
  if (discounted) {
    variables.discounted = JSON.parse(discounted);
    filterState.discounted = true;
  }

  const running = urlParams.get("running");
  if (running) {
    variables.running = JSON.parse(running);
    filterState.running = true;
  }

  const hiking = urlParams.get("hiking");
  if (hiking) {
    variables.hiking = JSON.parse(hiking);
    filterState.hiking = true;
  }
  const casual = urlParams.get("casual");
  if (casual) {
    variables.casual = JSON.parse(casual);
    filterState.casual = true;
  }
  const under100 = urlParams.get("under100");
  if (under100) {
    variables.under100 = JSON.parse(under100);
    filterState.under100 = true;
  }
  const over150 = urlParams.get("over150");
  if (over150) {
    filterState.over150 = true;
    variables.over150 = JSON.parse(over150);
  }
  const between100And150 = urlParams.get("between100And150");
  if (between100And150) {
    variables.between100And150 = JSON.parse(between100And150);
    filterState.between100And150 = true;
  }
  const male = urlParams.get("male");
  if (male) {
    variables.male = JSON.parse(male);
    filterState.male = true;
  }
  const female = urlParams.get("female");
  if (female) {
    variables.female = JSON.parse(female);
    filterState.female = true;
  }
  const unisex = urlParams.get("unisex");
  if (unisex) {
    variables.unisex = JSON.parse(unisex);
    filterState.unisex = true;
  }

  const sortByStorage = localStorage.getItem("sortBy");
  const sortByParam = urlParams.get("sortBy");
  let sortBy = "";
  if (sortByParam) {
    variables.sortBy = sortByParam;
    sortBy = sortByParam;
  } else if (sortByStorage) {
    variables.sortBy = sortByStorage;
    sortBy = sortByStorage;
  }

  return { filterState, searchParam, variables, sortBy, stock };
};

export const createFilterUrlParams = ({filters, sizes, search, sortBy}) => {
  console.log("form submitted");
  const filterBy = {};
  const filterUrlQuery = [];
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      filterBy[key] = true;
      filterUrlQuery.push(`${key}=${encodeURIComponent(value)}`);
    }
    
  }

  if (sortBy) {
    filterBy["sortBy"] = sortBy;
    localStorage.setItem("sortBy", sortBy);
  }

  if (sizes.length > 0) {
    filterUrlQuery.push(`sizes=${encodeURIComponent(sizes)}`);
  }

  const urlParams = new URLSearchParams(window?.location?.search);
  const searchParam = urlParams.get("search");
  if (searchParam) {
    filterBy["search"] = encodeURIComponent(searchParam);
    filterUrlQuery.push(`search=${encodeURIComponent(searchParam)}`);
  }
  console.log(filterUrlQuery.join("&"));

  return `/store?${filterUrlQuery.join("&")}`;
};
