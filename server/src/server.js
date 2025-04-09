import express from express;

const port = 8000;
const app = express();

app.get("api/tasks", (req, res) => {

    const tasks = [
        {id: 1, name: "Storstäda"},
        {id: 2, name: "Laga mat"},
    ];

    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})