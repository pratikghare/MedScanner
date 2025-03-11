import { Button, Input, Skeleton, Spinner } from "@heroui/react";
import { ExternalIcon, SearchIcon, XMarkIcon } from "../components/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import data from "../constants/data.json";
import { pharmacyImages } from "../constants/locale";
import { NavigationTab } from "../models";

interface LandingProps {
    selected: NavigationTab;
    inputValue: string;
    setInputValue: Function;
    activeSearchFocus: boolean;
    setSearchActive: Function;
    loader: boolean;
}

function Landing({ selected, inputValue, activeSearchFocus, setInputValue, setSearchActive, loader }: LandingProps) {
    return (
        <>
            <div className="mb-4 flex justify-between items-center mx-[5%] sm:mx-[5%] lg:mx-[20%]">
                <div className="md:flex-2 z-50">
                    <h1 className={"transition-ease text-2xl sm:text-3xl md:text-4xl font-bold " + (selected.theme === "light" ? "" : " bg-gray-950 bg-opacity-0")}>Save Money on<br /> <span className="text-blue-500">Medicines</span></h1>
                    <sub className="z-50">Helping <b>India</b> compare medicine prices</sub>

                    <Input type="text" placeholder="Search" radius="sm" size="md"
                        variant={selected.theme === "light" ? "bordered" : "flat"}
                        value={inputValue} className="mt-3 backdrop-blur-sm backdrop-opacity-70 rounded-lg transition-ease opacity-70"
                        onChange={(event) => setInputValue(event.target.value)}
                        autoFocus={activeSearchFocus}
                        onFocus={() => setSearchActive(true)}
                        startContent={<SearchIcon className="mr-2" />}
                        endContent={inputValue.length ? (loader ? <Spinner size="sm" color="primary" /> : <button onClick={() => setInputValue("")}><XMarkIcon className="size-4" /></button>) : ""}
                    />

                    <PharmacyLogos theme={selected.theme} />
                </div>

                <div className="flex-1 w-full h-full">
                    <div className="absolute left-auto right-0 md:right-auto md:left-[50%] lg:left-[55%] flex justify-end md:justify-start w-full h-full transition-ease">
                        <div className="mr-3 h-[200px] w-[200px] bg-hero-1 transition-ease"></div>
                        <div className="hidden sm:flex h-[200px] w-[200px] bg-hero-2 mt-1 transition-ease"></div>
                    </div>
                </div>
            </div>
            <div className="mx-[5%] sm:mx-[5%] lg:mx-[20%]">
                <h1 className="text-2xl"> Landing !</h1>
            </div>
        </>
    );
}

function SearchResults({ results, theme, classNames }: { results: Array<any>, theme: string | undefined, classNames?: string }) {
    return (
        <>
            {
                results.length > 0 &&
                results.map((result: any, index: number) => (
                    <div key={"search-result-item-" + index} className={"cursor-default justify-self-start justify-between rounded-lg p-4 w-full flex items-center gap-6 mt-4 " + classNames}>
                        <div className="w-full flex flex-col">
                            <span className="text-sm">{result.medicineName}</span>
                            <span className="text-xs text-gray-500">{result.packSize}</span>
                        </div>
                        <Button size="sm" color="primary" className="px-6" variant={theme === "light" ? "flat" : "solid"}>
                            <span>Compare</span>
                            <span><ExternalIcon className="size-3 sm:size-4" /></span>
                        </Button>
                    </div>
                ))
            }
            {
                results.length > 0 ?
                    <div className={"invisible cursor-default justify-self-start rounded-lg p-4 w-full flex items-center gap-3 mt-4 " + classNames}>
                        <div className="w-full flex flex-col">
                            <span className="text-sm">{results[results.length - 1].medicineName}</span>
                            <span className="text-xs text-gray-500">{results[results.length - 1].packSize}</span>
                        </div>
                    </div> :
                    <div className={"cursor-default justify-self-start rounded-lg p-4 w-full flex items-center gap-3 mt-4 " + classNames}>
                        <div className="w-full flex flex-col">
                            <span className="text-sm">No results found.</span>
                            <span className="text-xs text-gray-500"></span>
                        </div>
                    </div>
            }
        </>
    );
}

function PharmacyLogos(props: { size?: number, theme: string | undefined }) {
    const size: number = props.size ? props.size : 45;
    return (
        <div className="backdrop-blur-sm backdrop-opacity-70 md:backdrop-blur-none sm:flex-nowrap flex items-center overflow-hidden w-full p-2 gap-1 text-xs">
            {
                pharmacyImages.map((image, index) => (
                    <div className="group" key={image.className + "-" + index}>
                        <img
                            src={image.image}
                            alt={image.name}
                            width={size} height={size}
                            className={(!props.theme || props.theme === "dark" ? "sm:grayscale" : "") + " " + image.className }
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <span className="invisible hidden md:flex absolute cursor-default transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white opacity-60 text-xs rounded py-1 px-2">
                            {image.name}
                        </span>
                    </div>
                ))
            }
        </div>
    );
}

export default function Home() {
    const selected = useSelector((state: RootState) => state.currentTab);
    const [value, setValue] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [results, setResults] = useState<Array<any>>([]);
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [activeSearchFocus, setActiveSearchFocus] = useState<boolean>(false);

    const filterData = (term: string) => {
        setResults(data.filter((item) => String(item.medicineName).toLocaleLowerCase().includes(term.toLocaleLowerCase())));
    }

    useEffect(() => {
        if (value.length > 2) {
            setLoader(true);
            filterData(value);
            setTimeout(() => {
                setLoader(false);
                setIsFetched(true);
            }, 3000)
        }
        else {
            setLoader(false);
            setIsFetched(false);
        }
    }, [value]);

    return (
        <section className="grid mt-5 mx-0">
            {
                !searchActive || !value.length ?
                    <Landing selected={selected} inputValue={value} setInputValue={setValue} activeSearchFocus={activeSearchFocus} setSearchActive={setSearchActive} loader={loader} />
                    :
                    <div className="mx-[5%] sm:mx-[5%] lg:mx-[20%]">
                        <div className="flex-1 flex items-end gap-2">
                            <Input type="text" placeholder="Search" radius="sm" size="md"
                                variant={selected.theme === "light" ? "bordered" : "flat"}
                                value={value} className="mt-3 backdrop-blur-sm rounded-lg transition-ease"
                                onChange={(event) => setValue(event.target.value)}
                                onFocus={() => {
                                    setSearchActive(true);
                                    setActiveSearchFocus(true);
                                }}
                                autoFocus={searchActive}
                                startContent={<SearchIcon className="mr-2" />}
                                endContent={value.length ? (loader ? <Spinner size="sm" color="primary" /> : <></>) : ""}
                            />
                            <Button isIconOnly aria-label="Close" color={selected.theme === "light" ? "primary" : "default"}
                                variant="flat" onPress={() => {
                                    setSearchActive(false);
                                    setActiveSearchFocus(false);
                                    setValue("");
                                }}>
                                <XMarkIcon />
                            </Button>
                        </div>

                        {
                            loader &&
                            [1, 2, 3, 4].map((index: number) => (
                                <div key={"search-result-skeleton-" + index} className={"justify-self-start rounded-lg p-4 w-full flex items-center gap-3 mt-4 " + (selected.theme === "light" ? "border" : "bg-[#27272A]")}>
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        <Skeleton className="h-3 w-5/5 rounded-lg" />
                                    </div>
                                </div>
                            ))
                        }
                        {
                            !loader && isFetched && <SearchResults theme={selected.theme} classNames={selected.theme === "light" ? "border" : "bg-[#27272A]"} results={results} />
                        }
                    </div>
            }
        </section>
    );
}