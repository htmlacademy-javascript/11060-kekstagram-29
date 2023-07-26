const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      onError();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (url, data, onSuccess, onError) => {
  fetch(url,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      onError();
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
