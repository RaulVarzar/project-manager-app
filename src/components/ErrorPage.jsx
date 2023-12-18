import { Link } from "react-router-dom"

export default function ErrorPage() {
    return(
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
    <div class=" shadow overflow-hidden sm:rounded-lg pb-8">
    <div class=" text-center pt-8">
    <h1 class="text-9xl font-bold text-purple-400">404</h1>
    <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
    <p class="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
    {/* <button class="btn btn-accent text-white font-semibold px-6 py-3 rounded-md mr-6">
    HOME
    </button> */}
    </div>
    </div>
    </div>
    )
}
