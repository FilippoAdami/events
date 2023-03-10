import React, { useState, useEffect } from 'react';

const Datas = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch('/datas');
      const data = await res.json();
      setDatas(data);
    };

    fetchDatas();
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {datas.map(data => (
          <li key={data._id}>
            User {data.id} datas: <br></br>
            {data.user_name}: {data.email}: {data.password}: {data.phone}: {data.instagram}: {data.bio}: {data.image}<br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Datas;