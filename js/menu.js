const restourant = "tanuki";

const renderItems = (data) => {
  console.log(data);
};

fetch(`./db/${restourant}`)
  .then((response) => response.json())
  .then((data) => renderItems(data))
  .catch((error) => {
    console.log(error);
  });
