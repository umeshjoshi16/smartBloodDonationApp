import { useState, useMemo, useEffect } from "react";
import {Search,Phone,Mail,Droplets,CheckCircle2,XCircle,Users,UserCheck,UserX} from "lucide-react";
import axios from "axios";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "eligible", label: "Eligible" },
  { key: "not", label: "Not Eligible" },
];

export default function DonorTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const getDonor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/get-donors`,
          { withCredentials: true }
        );

        setDonors(res.data?.donors || []);
      } catch (err) {
        console.error(err);
        setDonors([]);
      }
    };

    getDonor();
  }, []);

 
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return donors.filter((d) => {
      const matchSearch =
        !q ||
        (d.name || "").toLowerCase().includes(q) ||
        (d.email || "").toLowerCase().includes(q) ||
        (d.bloodType || "").toLowerCase().includes(q) ||
        (d.phone || "").includes(q);

      const matchFilter =
        filter === "all" ||
        (filter === "eligible" && d.eligible) ||
        (filter === "not" && !d.eligible);

      return matchSearch && matchFilter;
    });
  }, [search, filter, donors]);


  const totalCount = donors.length;
  const eligibleCount = donors.filter((d) => d.eligible).length;
  const notEligibleCount = donors.filter((d) => !d.eligible).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-30 md:pb-5">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="flex items-center gap-3">
          <div className="bg-red-900 p-2 rounded-lg">
            <Droplets className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Donor Registry</h1>
            <p className="text-sm text-gray-500">Manage and track blood donors</p>
          </div>
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-3 gap-2 ">

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
            <div className="bg-red-50 p-2.5 rounded-lg mb-2 md:mb-0">
              <Users className="text-red-900 w-5 h-5" />
            </div>
            <div>
              <p className="text-base text-gray-500 mb-0.5">Active Donors</p>
              <p className="text-2xl font-semibold text-red-900">{totalCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
            <div className="bg-green-50 p-2.5 rounded-lg mb-2 md:mb-0">
              <UserCheck className="text-green-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-base text-gray-500 mb-0.5">Eligible</p>
              <p className="text-2xl font-semibold text-green-700">{eligibleCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center md:flex-row md:items-center md:gap-4 text-center md:text-left">
            <div className="bg-orange-50 p-2.5 rounded-lg mb-2 md:mb-0">
              <UserX className="text-orange-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-base text-gray-500 mb-0.5">Not Eligible</p>
              <p className="text-2xl font-semibold text-orange-600">{notEligibleCount}</p>
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">

          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">

            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, blood type or phone number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all cursor-pointer ${
                    filter === f.key
                      ? "bg-red-900 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

          </div>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Name</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Blood Type</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Contact</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Email</th>
                  <th className="text-center text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Total Donations</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Last Donated</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Days Since</th>
                  <th className="text-left text-base font-medium text-gray-500 px-4 py-3 whitespace-nowrap">Eligibility</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">
                      No donors match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((donor) => (
                    <tr key={donor.id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-semibold text-red-900 shrink-0">
                            {getInitials(donor.donorName)}
                          </div>
                          <span className="text-[14px] font-medium text-gray-900 whitespace-nowrap">
                            {donor.donorName}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-900 border border-red-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Droplets className="w-3 h-3" />
                          {donor.bloodGroup.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="whitespace-nowrap">{donor.phoneNumber}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 max-w-50">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{donor.email}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {donor.totalDonations ?? "\u2014"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-900 font-semibold whitespace-nowrap">
                        {donor.lastDonated ?? "\u2014"}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${donor.daysSince >= 90 ? "text-green-700" : "text-orange-600"}`}>
                          {donor.daysSince ?? "\u2014"}d
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {donor.eligible ? (
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Eligible
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            <XCircle className="w-3.5 h-3.5" />
                            Not Eligible
                          </span>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {donors.length} donors
            </p>
            <p className="text-xs text-gray-600 text-center">
              Donor Registry
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}