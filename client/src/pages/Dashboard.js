import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ResponsiveContainer, Cell, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getExpenses } from "../services/expensesService";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expensesTotalByCategory, setExpensesTotalByCategory] = useState([])

  const categoryColors = {
    Utility: "#FF6384",
    Groceries: "#36A2EB",
    Housing: "#FFCE56",
    Transport: "#4BC0C0",
    Health: "#9966CC",
    Education: "#FF9F40",
    Hobbies: "#008080",
    Savings: "#E7E9ED",
    Miscellaneous: "#DC7633"
  };

  const categoryNameMapping = {
    Utility: "Services Publics",
    Groceries: "Épicerie",
    Housing: "Logement",
    Transport: "Transport",
    Health: "Santé",
    Education: "Éducation",
    Hobbies: "Loisirs",
    Savings: "Épargne",
    Miscellaneous: "Autres"
  };

  const calculateTotalExpensesByCategory = (expenses) => {
    const groupedExpenses = expenses.reduce((acc, currentExpense) => {
      const key = currentExpense.expenseCategory;
      if (!acc[key]) {
        acc[key] = { name: key, value: 0, color: categoryColors[key], label: categoryNameMapping[key] };
      }
      acc[key].value += currentExpense.expenseAmount;
      return acc;
    }, {});

    const dataForPieChart = Object.values(groupedExpenses);

    return dataForPieChart;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpenses();
        setExpenses(expensesData?.expenses);
        setExpensesTotalByCategory(calculateTotalExpensesByCategory(expensesData?.expenses));
        setIsLoading(false);
      }

      catch (error) {
        setIsError(true);
        setErrorMessage(error?.response?.data?.message);
      }
    }

    fetchData();
  }, []);

  const data = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

  const dataBarChart = [
    { name: "A", x: 12, y: 23 },
    { name: "B", x: 22, y: 3 },
    { name: "C", x: 13, y: 15 },
    { name: "D", x: 44, y: 35 },
    { name: "E", x: 35, y: 45 },
    { name: "F", x: 62, y: 25 },
    { name: "G", x: 37, y: 17 }
  ];

  return (
    <>
      <Navigation />
      <Container className="my-5">
          <Row className="d-flex justify-content-between align-items-center mb-5">
            <Col xs="auto">
              <h2 style={{ marginBottom: 0 }}>Dashboard</h2>
            </Col>
          </Row>

          <div className="dashboard-widgets">
            <Card>
              <Card.Body>
                <h4>Répartition des dépenses mensuelles</h4>
                <ResponsiveContainer width="100%" height={360}>
                  <PieChart>
                    <Pie data={expensesTotalByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" label={({ payload }) => `${payload.name}: ${payload.value}`}>
                      {expensesTotalByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h4>Répartition des dépenses mensuelles</h4>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart width={500} height={300} data={dataBarChart} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="x" stackId="a" fill="#8884d8" />
                    <Bar dataKey="y" stackId="a" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </div>
      </Container>
    </>
  )
}

export default Dashboard;