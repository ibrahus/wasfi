
import { Fragment } from 'react'

import Nav from "../../components/Nav"
import Footer from "../../components/Footer"

import { PhotoIcon } from '@heroicons/react/24/solid'

import {  useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ReactLoading from 'react-loading';

import "./style.css"
 
const Langs = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Arabic' },
]

const Length = [
    { id: 1, name: 'Short' },
    { id: 3, name: 'Long' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const env = process.env
const OpenAiTpken = env.REACT_APP_OPEN_AI_TOKEN
const HFTpken = env.REACT_APP_HF_AI_TOKEN



export default function Example() {
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null);
    const [imageData, setImageData] = useState(null);

    const [title, setTitle] = useState('')
    const [brand, setBrand] = useState('')
    const [seo, setSeo] = useState('')
    const [features, setFeatures] = useState('')
    const [selectedTone, setSelectedTone] = useState(Langs[0])
    const [selectedLength, setSelectedLength] = useState(Length[0])


    const reset = () => {
        setTitle('')
        setBrand('')
        setSeo('')
        setFeatures('')
        setSelectedTone(Langs[0])
        setSelectedLength(Length[0])
        setImageData(null)
        setResponse('')
    }




    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Data = reader.result.split(',')[1];
            setImageData(base64Data);
            predict((`data:image/jpeg;base64,${base64Data}`))
        };
    };


    const handleGenerateTitle = async (caption) => {
        const url = 'https://api.openai.com/v1/chat/completions';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OpenAiTpken}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Given the caption '${caption}', generate a compelling and concise product title.`
                    }
                ],
                temperature: 0.2
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setTitle(data.choices[0].message?.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGenerateSEO = async (caption) => {
        
        const url = 'https://api.openai.com/v1/chat/completions';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OpenAiTpken}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Based on the product caption '${caption}', generate a short list of SEO-friendly keywords that potential customers might use to find this product online`

                    }
                ],
                temperature: 0.2
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setSeo(data.choices[0].message?.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGenerateFeatures = async (caption) => {
        const url = 'https://api.openai.com/v1/chat/completions';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OpenAiTpken}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `dentify up to 5 product keywords from the product caption: '${caption}`

                    }
                ],
                temperature: 0.2
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setFeatures(data.choices[0].message?.content);
        } catch (error) {
            console.error(error);
        }
    }


    const handleGenerate = async () => {
        setIsLoading(true)

        const url = 'https://api.openai.com/v1/chat/completions';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OpenAiTpken}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Create a ${selectedLength.name === "Short" ? "short " : 'detailed'} ${title !== "" && `, ${selectedLength.name === "Short" ? "concise " : 'comprehensive'} product description from the title '${title}'`}${`, caption '${result}'`}${features !== "" && `, key features '${features}'`}${seo !== "" && `, SEO keywords '${seo}'`}${brand !== "" && `, and considering the brand '${brand}'`}, in ${selectedTone.name} language.`
                    }
                ],
                temperature: 0.2
            })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setResponse(data.choices[0].message?.content);
            setIsLoading(false)

        } catch (error) {
            console.error(error);
            setIsLoading(false)

        }
    }






    const predict = async (imageData) => {
        setIsLoading(true)

        const response = await fetch('https://ibrahus-salesforce-blip-image-captioning-large.hf.space/run/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HFTpken}`
            },
            body: JSON.stringify({
                data: [imageData],
            }),
        });

        const result = await response.json();
        setResult(result.data[0]);
        handleGenerateTitle(result.data[0])
        handleGenerateSEO(result.data[0])
        handleGenerateFeatures(result.data[0])
        setIsLoading(false)
    };



    return (
        <>
        <div className="bg-white">
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
                <div className="space-y-10 divide-y divide-gray-900/10 " style={{margin: "10% 10%"}}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                       
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                {imageData ? <img src={`data:image/jpeg;base64,${imageData}`} alt="Selected Image" style={{ maxWidth: "200px", maxHeight: "200px" }} /> : <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />}

                                                

                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Title
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    type="text"
                                                    name="website"
                                                    id="website"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                            Brand
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={brand}
                                                    onChange={(e) => setBrand(e.target.value)}
                                                    type="text"
                                                    name="website"
                                                    id="website"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                        SEO keywords
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={seo}
                                                    onChange={(e) => setSeo(e.target.value)}
                                                    type="text"
                                                    name="website"
                                                    id="website"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Features
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={features}
                                                    onChange={(e) => setFeatures(e.target.value)}
                                                    type="text"
                                                    name="website"
                                                    id="website"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <Listbox value={selectedTone} onChange={setSelectedTone}>
                                            {({ open }) => (
                                                <>
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Languge</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedTone.name}</span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {Langs.map((Lang) => (
                                                                    <Listbox.Option
                                                                        key={Lang.id}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                            )
                                                                        }
                                                                        value={Lang}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {Lang.name}
                                                                                </span>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <Listbox value={selectedLength} onChange={setSelectedLength}>
                                            {({ open }) => (
                                                <>
                                                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Description length</Listbox.Label>
                                                    <div className="relative mt-2">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selectedLength.name}</span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {Length.map((person) => (
                                                                    <Listbox.Option
                                                                        key={person.id}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                            )
                                                                        }
                                                                        value={person}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                    {person.name}
                                                                                </span>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button type="button" onClick={() => reset()} className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>

                                <button
                                    onClick={() => handleGenerate()}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>
                        <div className=" px-4 py-6 sm:p-8  bg-white shadow-sm ring-1 ring-gray-900/5 " style={{borderRadius: '10px'}}>
                            <h2 className="text-bold font-bold leading-7 text-gray-900">Result:</h2>
                            <p className="mt-1 text-md font-semibold leading-6 text-black-600">
                                {response}
                                
                                {/* {result} */}
                            </p>
                        </div>

                       
                    </div>
                </div>
       
                </div>
            <Footer />
            </div>
            {
                isLoading && 
                <div className="loading">
                    <ReactLoading color={'green'} />
                </div>
            }
         
        </>
        
    )
}