export default function HomePage() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored User:", storedUser);
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Home Page</h1>
        </div>
    )
}