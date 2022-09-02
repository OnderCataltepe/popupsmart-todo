export const getFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("something went wrong!");
  }
  return await response.json();
};

export const deleteFetch = async (data) => {
  const response = await fetch(
    `https://630d0fa8b37c364eb7ff8583.mockapi.io/todos/` + data.id,
    { method: "DELETE" }
  );
  if (!response.ok) {
    throw new Error("something went wrong!");
  }
  return data.id;
};

export const deleteCompletedFetch = (data) => {
  data.forEach(async (element) => {
    const response = await fetch(
      `https://630d0fa8b37c364eb7ff8583.mockapi.io/todos/` + element.id,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong!");
    }
  });
  return data;
};

export const postFetch = async (data) => {
  const response = await fetch(
    `https://630d0fa8b37c364eb7ff8583.mockapi.io/todos/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add!");
  }

  return await response.json();
};

export const putFetch = async (data) => {
  const response = await fetch(
    "https://630d0fa8b37c364eb7ff8583.mockapi.io/todos/" + data.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
        isCompleted: !data.isCompleted,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add!");
  }
  return await response.json();
};

export const putContentFetch = async (data) => {
  const response = await fetch(
    "https://630d0fa8b37c364eb7ff8583.mockapi.io/todos/" + data.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
        isCompleted: data.isCompleted,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add!");
  }
  return await response.json();
};
