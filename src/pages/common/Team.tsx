
export default function Team() {
    return (
        <>
            <div className="about_us container mx-auto px-3 py-8">
                <h2 className="font-bold text-3xl mb-2 text-center">Our Team</h2>
                <div className="teams">
                    {/* <h3 className="text-xl font-semibold my-5">Our Team</h3> */}
                    <div className="members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
                        <div className="member flex flex-col items-center">
                            <img
                                className="w-[250px] object-cover h-[250px] rounded-full"
                                src="/team/oph.png"
                                alt="team member"
                            />
                            <p>Operation Head</p>
                        </div>
                        <div className="member flex flex-col items-center">
                            <img
                                className="w-[250px] object-cover h-[250px] rounded-full"
                                src="/team/so1.png"
                                alt="team member"
                            />
                            <p>Sales Officer</p>
                        </div>
                        <div className="member flex flex-col items-center">
                            <img
                                className="w-[250px] object-cover h-[250px] rounded-full"
                                src="/team/so2.png"
                                alt="team member"
                            />
                            <p>Sales Officer</p>
                        </div>
                        <div className="member flex flex-col items-center">
                            <img
                                className="w-[250px] object-cover h-[250px] rounded-full"
                                src="/team/so3.png"
                                alt="team member"
                            />
                            <p>Sales Officer</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
