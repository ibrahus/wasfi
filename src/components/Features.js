import { ArrowTrendingUpIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/20/solid'


const features = [
    {
        name: 'Refresh seasonal content.',
        description:
            "Keep your content fresh to improve rankings and on- page conversion.Reduce writer's block for your team by giving them a first draft of a description to work off.",
        icon: ArrowPathIcon,
    },
    {
        name: 'Increase SEO keywords.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: ArrowTrendingUpIcon,
    },
    {
        name: 'Improve conversion rates.',
        description: 'Product descriptions convert because they educate customers on key product features and benefits.A / B test your highest- conversion copy with all the variations provided by AI.',
        icon: ChartBarIcon,
    },
]


const Features = () => {

    return (
        <div className="overflow-hidden py-24 sm:py-32">
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
            <div className="mx-auto max-w-7xl md:px-6 lg:px-8" style={{ backgroundColor: "white", zIndex: '2px' }}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start" >
                    <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Sell More</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why you should use our AI tool</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                According to recent Google survey showed that 85% of online shoppers find product descriptions and pictures very important when choosing where to buy from.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="sm:px-6 lg:px-0">
                        <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                            <div
                                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                                aria-hidden="true"
                            />
                            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                                <img
                                    src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                                    alt="Product screenshot"
                                    width={2432}
                                    height={1442}
                                    className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                                />
                            </div>
                            <div
                                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Features