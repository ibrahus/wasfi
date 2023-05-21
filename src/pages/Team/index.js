import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import aziz from "./aziz.jpg"
import mohammed from "./mohammed.jpeg"
import ibrahim from "./ibrahim.jpg"
import turki from "./turki.png"
import harbi from "./harbi.jpeg"


const people = [
    {
        name: 'Abdulaziz Aldreweesh',
        role: 'Product Owner',
        imageUrl:
            aziz,
    },

    {
        name: 'Mohammed Abahussain',
        role: 'Software Engineer',
        imageUrl:
            mohammed,
    },
    {
        name: 'Ibrahim Alhussain',
        role: 'Software Engineer',
        imageUrl:
            ibrahim,
    },
    {
        name: 'Turki Alarefe',
        role: 'Business Analyst',
        imageUrl:
            turki,
    },
        {
        name: 'Mohammed Alhuarbi',
        role: 'Business Analyst',
        imageUrl:
            harbi,
    },
    // More people...
]

export default function Team() {
    return (
        <div className="">
            <Nav />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className=" py-24 sm:py-32">
                    
                    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our <span className=" text-green-900" style={{ color: '#18bc9b'}}>HEROS</span></h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                            
                            </p>
                        </div>
                        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                            {people.map((person) => (
                                <li key={person.name}>
                                    <div className="flex items-center gap-x-6">
                                        <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                        <div>
                                            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                            <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}