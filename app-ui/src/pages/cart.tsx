import { Button } from "@heroui/react";

export function Cart() {
    return (
        <section className="grid mt-5 mx-0 cursor-default">
            <div className="mb-4 flex justify-between items-center mx-[5%] sm:mx-[5%] lg:mx-[20%]">
                <div className="md:flex-1 z-50">
                        {
                            true ? 
                            <>
                                <h2 className="text-xl flex items-end mb-2">
                                    <span className="text-medium">Subtotal</span>
                                    <span className="ml-4 flex">
                                        <span className="text-xs">₹</span>
                                        <b>{ "2093" }</b>
                                    </span>
                                </h2>
                                <Button radius="sm" color="primary" className="w-full">Proceed to buy</Button>
                            </> 
                            : <></>
                        }
                </div>
            </div>
        </section>
    );
}