{active === 'steps' && details?.analyzedInstructions[0]?.steps && (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          {details.analyzedInstructions[0].steps.map((step, index) => (
            <div key={index} className="grid gap-6 row-gap-10 lg:grid-cols-2">
              <div className="lg:py-6 lg:pr-16">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <svg
                          className="w-4 text-gray-600"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <line fill="none" strokeMiterlimit="10" x1="12" y1="2" x2="12" y2="22" />
                          <polyline fill="none" strokeMiterlimit="10" points="19,15 12,22 5,15" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300" />
                  </div>
                  <div className="pt-1 pb-8">
                    <p className="mb-2 text-lg font-bold">Step {step.number}</p>
                    <p className="text-gray-700">{step.step}</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                  src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipe;