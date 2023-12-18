const getPagination = (req, count, page, limit) => {
  let result = {};
  let link = {};
  let path = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;

  const totalPages = Math.ceil(count / limit);

  if (page < totalPages) {
    link.next = `${path}?page=${page + 1}&limit=${limit}`;
  } else {
    link.next = "";
  }

  if (page > 1) {
    link.prev = `${path}?page=${page - 1}&limit=${limit}`;
  } else {
    link.prev = "";
  }

  result.links = link;
  result.total_items = count;

  return result;
};

module.exports = { getPagination };
