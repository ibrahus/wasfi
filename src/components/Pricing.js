import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tiers = [
    {
        name: 'Basic',
        id: 'tier-freelancer',
        href: '#',
        price: { monthly: '119 SAR', annually: '1000 SAR' },
        description: 'This plan designed for the small e-commerce store.',
        features: [' Up to 100 products description generating.', 'English language only.'],
        featured: false,
        cta: 'Buy plan',
    },
    {
        name: 'Growth',
        id: 'tier-startup',
        href: '#',
        price: { monthly: '239 SAR', annually: '2400 SAR' },
        description: 'This plan designed for medium e-commerce store.',
        features: [
            'Up to 500 products description generating.',
            '  Upload multiple images at once',
            'English and Arabic and 10 languages',
            'SEO optimization',
        ],
        featured: false,
        cta: 'Buy plan',
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '/contact',
        price: 'Custom',
        description: ' This plan designed for large e-commerce store',
        features: [
            'Unlimited products',
            'Image optimization.',
            'Upload multiple images at once.',
            'SEO optimization.',
            '35 languages',
        ],
        featured: true,
        cta: 'Contact sales',
    },
]


const frequencies = [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]

 const Pricing = () => {
    const [frequency, setFrequency] = useState(frequencies[0])

    return (
        <div className=" py-24 sm:py-32">
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
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Pricing plans for all products
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                    Speed up your product description creation with AI.
                </p>
                <div className="mt-16 flex justify-center">
                    <RadioGroup
                        value={frequency}
                        onChange={setFrequency}
                        className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
                    >
                        <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
                        {frequencies.map((option) => (
                            <RadioGroup.Option
                                key={option.value}
                                value={option}
                                className={({ checked }) =>
                                    classNames(
                                        checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                                        'cursor-pointer rounded-full px-2.5 py-1'
                                    )
                                }
                            >
                                <span>{option.label}</span>
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                </div>
                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={classNames(
                                tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                                'rounded-3xl p-8 ring-1 xl:p-10'
                            )}
                        >
                            <h3
                                id={tier.id}
                                className={classNames(
                                    tier.featured ? 'text-white' : 'text-gray-900',
                                    'text-lg font-semibold leading-8'
                                )}
                            >
                                {tier.name}
                            </h3>
                            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                                {tier.description}
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span
                                    className={classNames(
                                        tier.featured ? 'text-white' : 'text-gray-900',
                                        'text-4xl font-bold tracking-tight'
                                    )}
                                >
                                    {typeof tier.price === 'string' ? tier.price : tier.price[frequency.value]}
                                </span>
                                {typeof tier.price !== 'string' ? (
                                    <span
                                        className={classNames(
                                            tier.featured ? 'text-gray-300' : 'text-gray-600',
                                            'text-sm font-semibold leading-6'
                                        )}
                                    >
                                        {frequency.priceSuffix}
                                    </span>
                                ) : null}
                            </p>
                            <a
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={classNames(
                                    tier.featured
                                        ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                                        : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                                )}
                            >
                                {tier.cta}
                            </a>
                            <ul
                                role="list"
                                className={classNames(
                                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10'
                                )}
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon
                                            className={classNames(tier.featured ? 'text-white' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                                            aria-hidden="true"
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
 }

export default Pricing