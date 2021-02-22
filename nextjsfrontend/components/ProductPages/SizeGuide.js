import React from "react";
import measureFoot from "../../images/how-to-measure-shoes.png";
export const SizeGuide = () => {
  return (
    <div>
      <h3>Size Guide</h3>

      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>UK</th>
            <td>6</td>
            <td>6.5</td>
            <td>7</td>
            <td>7.5</td>
            <td>8</td>
            <td>8.5</td>
            <td>9</td>
            <td>9.5</td>
            <td>10</td>
            <td>10.5</td>
            <td>11</td>
            <td>11.5</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <th>EU</th>
            <td>40</td>
            <td>40.5</td>
            <td>41</td>
            <td>42</td>
            <td>42.5</td>
            <td>43</td>
            <td>44</td>
            <td>44.5</td>
            <td>45</td>
            <td>45.5</td>
            <td>46</td>
            <td>47</td>
            <td>47.5</td>
            <td>48.5</td>
            <td> - </td>
          </tr>
          <tr>
            <th>US</th>
            <td>7</td>
            <td>7.5</td>
            <td>8</td>
            <td>8.5</td>
            <td>9</td>
            <td>9.5</td>
            <td>10</td>
            <td>10.5</td>
            <td>11</td>
            <td>11.5</td>
            <td>12</td>
            <td>12.5</td>
            <td>13</td>
            <td>14</td>
            <td> - </td>
          </tr>
        </tbody>
      </table>
      <h3>HOW TO MEASURE</h3>

      <p>Follow these steps to get the right size.</p>

      <div
        style={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#ebedee",
        }}
      >
        <div style={{ width: "50%", margin: "20px" }}>
          <ol style={{ padding: "0" }}>
            <li>
              <p>
                Step on a piece of paper with your heel slightly touching a wall
                behind
              </p>
            </li>
            <li>
              <p>
                Mark the end of your longest toe on the paper (you might need a
                friend to help you) and measure from the wall to the marking.
              </p>
            </li>
            <li>
              <p>
                Do the same for the other foot and compare measurements with
                your size chart to get the right size
              </p>
            </li>
          </ol>
        </div>
        <div style={{ width: "50%", height: "fit-content" }}>
          <img src={measureFoot} alt="" width="100%" />
        </div>
      </div>
    </div>
  );
};
