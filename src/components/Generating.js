import { InboxIcon, TrashIcon, UsersIcon, ArrowUpOnSquareStackIcon, PlusCircleIcon, Bars3Icon } from '@heroicons/react/24/outline'



const features = [
    {
        name: 'Upload product image',
        description:
            'Seamlessly upload your image to our AI tool for effortless generation of creative and unique descriptions.',
        href: '#',
        icon: ArrowUpOnSquareStackIcon,
    },
    {
        name: 'Add product attributes',
        description:
            'Elevate the quality of the generated descriptions by adding specific product attributes that align with your requirements.',
        href: '#',
        icon: PlusCircleIcon,
    },
    {
        name: 'Craft fresh, unique copy instantly',
        description:
            'Experience the power of our AI tool as it delivers instant, captivating, and one-of-a-kind product descriptions that are sure to grab attention.',
        href: '#',
        icon: Bars3Icon,
    },
]




const Generating = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Generating</h2>

                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How it works
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Transform product image into engaging, high-conversion stories and product descriptions. All in your tailored brand voice.

                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Generating