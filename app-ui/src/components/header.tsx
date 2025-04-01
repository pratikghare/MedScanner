import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    NumberInput,
    Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import { styles } from "../constants/locale";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { fetchLocationByGeoCode, fetchLocationByPostCode } from "../services/user-service";
import { UserLocation } from "../models/user-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCurentLocation } from "../store/reducers/current-location";
import { currentLocationSelector } from "../store/selectors";

function LocationPopover() {
    const [loader, setLoader] = useState<boolean>(false);
    const [locationHead, setLocationHead] = useState<string>("Other");
    const [locationSub, setLocationSub] = useState<string>("Enable Permissions");
    const [isOpen, setIsOpen] = useState<boolean>();

    const { position, errorCode } = useGeoLocation();
    
    const dispatch = useDispatch<AppDispatch>();
    const currentLocation = useSelector(currentLocationSelector);

    useEffect(() => {
        if(position && !errorCode) {
            setLocationHead("Current Location");
            fetchLocationByGeoCode(position.latitude, position.longitude).then((data: UserLocation) => dispatch(setCurentLocation(data)));
        }
    }, [position, errorCode]);

    useEffect(() => {
        const subtext = currentLocation.city ? currentLocation.city : currentLocation.county ? currentLocation.county : currentLocation.state ? currentLocation.state : currentLocation.countryCode ? currentLocation.countryCode : "";
        currentLocation.postCode?.length && setLocationSub(subtext + ` (${currentLocation.postCode})`);
    }, [currentLocation])

    const onChange = (event: any) => {
        const term: string = event.target.value;
        if (event.key === "Enter") {
            setLoader(true);
            const code = term.split(",").join("");
            fetchLocationByPostCode(code).then((data: UserLocation) => {
                dispatch(setCurentLocation(data));
            }).finally(() => {
                setLoader(false);
                setIsOpen(false);
            });
        }
    }

    return (
        <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} radius="sm" classNames={{ content: "p-2" }} showArrow backdrop="blur" offset={10} placement="left">
            <PopoverTrigger>
                <button className="text-xs outline-none">
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-xs">{locationHead}</span>
                        <span className="flex items-center gap-1"> <MapPinIcon className="size-4" /> {locationSub}</span>
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <p className="self-start text-xs font-bold mb-1">Enter location manually</p>
                <NumberInput placeholder="Postcode" radius="sm" variant="bordered"
                    classNames={{ inputWrapper: "p-0 px-2 max-w-[158px] h-10", input: "text-xs" }} hideStepper size="sm"
                    onKeyUp={onChange} aria-label="post-code"
                    endContent={loader && <Spinner size="sm" />}
                />
            </PopoverContent>
        </Popover>
    );
}


export default function Header() {
    return (
        <Navbar classNames={{ wrapper: styles.basePadding, base: "h-12", brand: "-mb-1" }}>
            <NavbarContent>
                <NavbarBrand>
                    <img src="/logo.png" className="h-10 -mt-1 mr-1" alt="MedScanner" />
                    <p className="font-bold text-inherit">MedScanner</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <LocationPopover />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

