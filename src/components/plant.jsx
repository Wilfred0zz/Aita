import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from "../assets/imageCatalog";
import Moment from "react-moment";
import moment from "moment";

function Plants() {
  const [userPlants, setUserPlants] = useState([]);
  const [plantId, setPlantId] = useState(0);
  const [dt, setDt] = useState(moment());
  const dateFormat = "MM/DD/YYYY HH:mm";

  useEffect(async () => {
    const res = await Axios({ method: "GET", url: "/api/getPlants" });
    setUserPlants(res.data);
    const plantGrown = [];
    const plantDied = [];
    for (let plant of res.data) {
      let firstTimePlanted = moment(plant[3]);
      let timeGrown = firstTimePlanted.add(plant[10], "hour");

      let lastTimeWatered = moment(plant[4]);
      let shouldBeWatered = lastTimeWatered.add(plant[11], "hour");

      // if gone over 24 hours from last time it should be watered plant dies
      let deathMark = lastTimeWatered.add(plant[11] + 24, "hour");

      if (moment().isAfter(timeGrown)) {
        plantGrown.push(plant[0]);
      } else if (moment().isAfter(deathMark)) {
        plantDied.push(plant[0]);
      }
    }
    await Axios.post("/api/grown", { plantId: plantGrown });
    await Axios.post("/api/isAlive", { plantId: plantDied });
    await Axios.get("/api/getPlants");
  }, []);

  const sellItem = (plantId, itemId) => {
    // alert("plantId: " + plantId + " itemId: " + itemId);
    Axios({
      method: "POST",
      data: {
        plantId: plantId,
        itemId: itemId,
      },
      //withCredentials: true,
      url: "/api/sellPlant",
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const waterPlant = (plantId, itemId) => {
    // alert("plantId: " + plantId + " itemId: " + itemId);
    Axios({
      method: "POST",
      data: {
        plantId: plantId,
        // itemId: itemId
      },
      withCredentials: true,
      url: "/api/water",
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="plant-container">
      <div>
        {userPlants.length !== 0 ? (
          <div className="plant-container row">
            {userPlants.map((plant) => (
              <div key={plant[0]}>
                {plant[7] !== 1 && (
                  <div className="plant-card">
                    {
                        plant[5] === 0 ? (
                            <img
                                alt="dead-plant-img"
                                style={{ height: "70px" }}
                                src={`/images/${ImageCatalog[0]}`}
                            />
                        ) : ( <img
                            alt="plant-img"
                            style={{ height: "70px" }}
                            src={`/images/${ImageCatalog[`${plant[1]}`]}`}
                          />)
                    }
                    {/* <div> {plant[5]} </div>
                    <div> {plant[6]} </div> */}
                    <div>
                      {"Name: "}
                      {plant[8] + " "}
                    </div>
                    <div>
                      {"Plant Species: "}
                      {plant[9] + " "}
                    </div>
                    <div>
                      {"First time Planted: "}{" "}
                      <Moment format={dateFormat}>{plant[3]}</Moment>
                    </div>
                    <div>
                      {"Last time Watered: "}{" "}
                      <Moment format={dateFormat}>{plant[4]}</Moment>
                    </div>
                    <div>{"time it takes to grow: " + plant[10]}</div>
                    <div>{"water interval: " + plant[11]}</div>
                    <div>
                      <span>The plant will be grown by: </span>
                      <Moment format={dateFormat} add={{ hours: plant[10] }}>
                        {plant[3]}
                      </Moment>
                    </div>
                    <span>next time to water: </span>
                    <Moment format={dateFormat} add={{ hours: plant[11] }}>
                      {plant[4]}
                    </Moment>
                    <div>
                      <span>Selling Price: $</span>
                      {plant[12]}
                    </div>
                    <div>
                      <button onClick={(e) => waterPlant(plant[0], plant[1])}>
                        water
                      </button>
                      { plant[5] === 1 && plant[6] === 1 &&
                        <button onClick={(e) => sellItem(plant[0], plant[1])}>
                          sell
                        </button>
                      }

                    </div>
                    {/* {dt} */}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div> You have not planted any plants yet! </div>
        )}
      </div>
    </div>
  );
}

export default Plants;
