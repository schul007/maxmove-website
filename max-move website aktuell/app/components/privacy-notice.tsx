export function PrivacyNotice() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm">
          Diese Website verwendet Cookies, um Ihnen ein besseres Nutzererlebnis zu bieten.
          Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.
        </p>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
          Akzeptieren
        </button>
      </div>
    </div>
  )
}

