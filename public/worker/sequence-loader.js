onmessage = async function (e) {
  const { baseUrl, count, prefix, numberLength } = e.data;
  const imagePromises = [];

  for (let i = 0; i < count; i++) {
    const imageLink = `${baseUrl}${prefix}${i
      .toString()
      .padStart(numberLength, "0")}.webp`;

    imagePromises.push(
      fetch(imageLink, { mode: "cors" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok for image: ${imageLink}`
            );
          }
          return response.blob();
        })
        .then((blob) => {
          const fileBlob = URL.createObjectURL(blob);
          postMessage({ imageSrc: fileBlob, index: i });
        })
        .catch((error) => {
          console.error("WORKER ERROR: ", error);
          postMessage({ error: error.message, index: i });
        })
    );
  }

  await Promise.all(imagePromises);
};
