export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="site-title">Home</a>
        <ul>
            <li>
                <a href="/vehicle" className="site-title">Vehicles</a>
            </li>
            <li>
                <a href="/customer" className="site-title">Customers</a>            </li>
            <li>
                <a href="/rent" className="site-title">Rent</a>
            </li>
        </ul>
    </nav>
}