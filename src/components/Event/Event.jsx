function Event({ hotEvent = false, event }) {
  return (
    <div className='event w-full mb-6 p-2'>
      <div className='relative'>
        <img
          src={event.img}
          alt='event-img'
          className='rounded-bl-md rounded-br-md'
        />
        <h2
          className={
            'uppercase text-lg hover:underline hover:cursor-pointer font-semibold mt-6' +
            (hotEvent
              ? ' absolute bottom-0 bg-orange-500/[0.8] text-white p-4 rounded-bl-md rounded-br-md text-2xl font-bold mt-0'
              : '')
          }
        >
          {event.name}
        </h2>
      </div>
    </div>
  );
}

export default Event;
