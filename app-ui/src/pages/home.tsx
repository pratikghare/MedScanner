import { Button, Input, Skeleton, Spinner } from "@heroui/react";
import { pharmacyImages, Theme } from "../constants/locale";
import { ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { themeSelector } from "../store/selectors";
import { getMedicinesByName } from "../services/product-service";
import { Medicine } from "../models/products";

export default function Home() {
    const [inputValue, setInputValue] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [results, setResults] = useState<Array<Medicine>>([]);
    const theme = useSelector(themeSelector);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (inputValue.length > 2) {
            setLoader(true);

            debounceRef.current = setTimeout(() => {
                getMedicinesByName(inputValue).then((data: Array<Medicine>) => {
                    setResults(data);
                    setLoader(false);
                    // setIsFetched(true);
                });
            }, 500);
        }
        else {
            setLoader(false);
            // setIsFetched(false);
        }
    }, [inputValue]);

    return (
        <div className="mt-5 transition-ease relative">
            <div>
                {
                    inputValue.length === 0 ?
                        <>
                            <h1 className="transition-ease text-2xl sm:text-3xl md:text-4xl font-bold">
                                Save Money on <br /> <span className="text-blue-500">Medicines</span>
                            </h1>
                            <sub className="z-50">Helping <b>India</b> compare medicine prices</sub>
                        </> : <></>
                }

                <Input type="text" placeholder="Search" radius="sm" size="md"
                    variant={theme.current === "light" ? "bordered" : "flat"} value={inputValue}
                    classNames={{ inputWrapper: "group-data-[focus=true]:border-default-400" }}
                    className={`mt-3 text-sm backdrop-blur-sm backdrop-opacity-70 rounded-lg z-50 transition-ease opacity-70 ${inputValue.length ? "" : "max-w-[40em]"}`}
                    onChange={(event) => setInputValue(event.target.value)}
                    startContent={<MagnifyingGlassIcon className="size-4" />}
                    endContent={inputValue.length ? (loader ? <Spinner size="sm" color="primary" /> : <button onClick={() => setInputValue("")}><XMarkIcon className="size-4" /></button>) : ""}
                />

                {
                    inputValue.length === 0 ? <PharmacyLogos theme={theme.current} /> : <></>
                }

                {
                    inputValue.length === 0 ?
                        <div className="absolute -z-10 bottom-0 left-auto right-0 flex justify-end md:justify-start transition-ease">
                            <div className="mr-3 h-[200px] w-[200px] bg-hero-1 transition-ease"></div>
                            <div className="hidden sm:flex h-[200px] w-[200px] bg-hero-2 mt-1 transition-ease"></div>
                        </div> : <></>
                }
                {
                    inputValue.length > 0 ?
                        (loader ? <SearchResultsSkeleton /> : <SearchResults results={results} />) : <></>
                }
            </div>
        </div>
    );
}

function SearchResultsSkeleton({ limit }: { limit?: number}) {
    const arr = limit ? [1, 2, 3, 4].slice(0, limit) : [1, 2, 3, 4];
    const theme = useSelector(themeSelector);

    return (
        arr.map((index: number) => (
            <div key={"search-skeleton-" + index} className={"w-full flex items-center gap-3 p-3 rounded-lg my-4 border-default-200 " + (theme.current === "light" ? "border-2" : "border")}>
                <div>
                    <Skeleton className="flex rounded-md w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                    {/* <Skeleton className="flex rounded-md w-12 sm:w-20 h-5" /> */}
                    <Skeleton className="flex rounded-md w-12 sm:w-20 h-5" />
                </div>
            </div>
        ))
    );
}

function SearchResults({ results }: { results: Array<Medicine>}) {
    const theme = useSelector(themeSelector);
    return (
        <div className="pb-[30px]">
            {
                results?.map((item: Medicine, index: number) => (
                    <div key={item.productId + "-result-" + index} className={"w-full flex items-center gap-5 p-2 pr-4 rounded-lg my-4 border-default-200 " + (theme.current === "light" ? "border-2" : "border")}>
                        <div className="w-[80px] flex justify-center">
                            <img className="h-[80px]" src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="w-full flex flex-col gap-1 text-sm">
                            <span>{item.name}</span>
                            <span className="text-xs text-gray-500">{item.manufacturer}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button size="sm" color="primary"
                                variant={theme.current === "light" ? "flat" : "solid"}
                                endContent={<ArrowTopRightOnSquareIcon className="size-4 outline-none" />}
                            >
                                Compare
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

function PharmacyLogos(props: { size?: number, theme: string }) {
    const size: number = props.size ? props.size : 45;
    return (
        <div className="z-50 max-w-[560px] backdrop-blur-sm backdrop-opacity-70 md:backdrop-blur-none sm:flex-nowrap flex items-center overflow-hidden w-full p-2 gap-1 text-xs">
            {
                pharmacyImages.map((image, index) => (
                    <div className="group" key={image.name + "-" + index}>
                        <img
                            src={image.image}
                            alt={image.name}
                            width={size} height={size}
                            className={(!props.theme || props.theme === "dark" ? "sm:grayscale" : "") + " " + image?.className}
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