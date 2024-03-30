import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransection }) => {
  // categories
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // transection
  const totalTransection = allTransection.length;
  const totalIncomeTransection = allTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenceTransection = allTransection.filter(
    (transection) => transection.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransection.length / totalTransection) * 100;
  const totalExpencePercent =
    (totalExpenceTransection.length / totalTransection) * 100;

  // total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenceTurnover = allTransection
    .filter((transection) => transection.type === "expense")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenceTurnoverPercent =
    (totalExpenceTurnover / totalTurnover) * 100;
  return (
    <> 
    <div className="cat">
      <div className="row m--1">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transection : {totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                {" "}
                Income : {totalIncomeTransection.length}{" "}
              </h5>
              <h5 className="text-danger">
                {" "}
                Expense : {totalExpenceTransection.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-5"
                  percent={totalIncomePercent.toFixed(0)}
                  style={{ display: 'inline' }}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-5"
                  percent={totalExpencePercent.toFixed(0)}
                  style={{ display: 'inline' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success"> Income : {totalIncomeTurnover} </h5>
              <h5 className="text-danger"> Expense : {totalExpenceTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-5"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-5"
                  percent={totalExpenceTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row mt-8">
        <div id="com" className="col-md-29">
          <h4 className="ss1">CategoryWise Income</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "income" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="col-md-20">
          <h4 className="ss2">CategoryWise Expense</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transection) =>
                  transection.type === "expense" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      </div>
      </>
  );
};

export default Analytics;
