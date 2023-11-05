import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import "../AdminDashboard/components/sidebar/sidebar.css";
import { DatePicker, Select, Slider } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { ClockCircleTwoTone, CarTwoTone } from "@ant-design/icons";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Button, Space, Checkbox, Menu, Dropdown } from "antd";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
function FilteredCarsPage() {
  const { RangePicker } = DatePicker;
  const {
    fromDate: initialFromDate,
    toDate: initialToDate,
    selectedPickupLocation,
  } = useParams();
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  const [cars, setCars] = useState([]);
  const [pickupLocations, setPickupLocations] = useState([]);
  const navigate = useNavigate();

  function filterCars() {
    axios.post("/filteredCars", selectedFilters).then((response) => {
      //   console.log(selectedFilters);
      setCars(response.data);
    });
  }
  useEffect(() => {
    //get cars and pickup locations when u enter the page
    axios
      .post("/filteredCars", { fromDate, toDate, selectedPickupLocation })
      .then((response) => {
        setCars(response.data);
        //   console.log(response.data);
      });

    axios.get("/pickup-locations").then((response) => {
      setPickupLocations(response.data);
    });
  }, []);

  const filters = [
    {
      key: "fuel",
      label: "Fuel",
      options: ["Petrol", "Diesel", "Hybrid", "Electric"],
      icon: <LocalGasStationIcon />,
    },
    {
      key: "type",
      label: "Type",
      options: ["Sedan", "SUV", "Family Car", "Convertible"],
      icon: <DirectionsCarIcon />,
    },
    {
      key: "seats",
      label: "Seats",
      options: ["2", "5", "7", "7+"],
      icon: <GroupIcon />,
    },
    {
      key: "price",
      label: "Price/day",
      options: ["<30", "30-60", "60-100", "100+"],
      icon: <AttachMoneyIcon />,
    },
  ];

  const FilterDropdown = ({ filter, selectedValues, onChange }) => {
    return (
      <Menu>
        {filter.options.map((option) => (
          <Menu.Item key={option}>
            <Checkbox
              checked={selectedValues.includes(option)}
              onChange={(e) => onChange(filter.key, e.target.checked, option)}
            >
              {option}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const pickupLocationOptions = pickupLocations.map((location) => ({
    value: location,
    label: location,
  }));

  function handleDataChange(values) {
    const fromDate = moment(values[0].$d).format("MMM DD YYYY HH:mm");
    const toDate = moment(values[1].$d).format("MMM DD YYYY HH:mm");
    setSelectedFilters({
      ...selectedFilters,
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  const [selectedFilters, setSelectedFilters] = useState({
    fromDate: fromDate,
    toDate: toDate,
    selectedPickupLocation,
    fuel: [],
    type: [],
    seats: [],
    price: [],
  });

  const handleFilterChange = (filterKey, checked, option) => {
    if (checked) {
      setSelectedFilters({
        ...selectedFilters,
        [filterKey]: [...selectedFilters[filterKey], option],
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [filterKey]: selectedFilters[filterKey].filter(
          (value) => value !== option
        ),
      });
    }
  };
  return (
    <div class="antialiased bg-gray-50 ">
      <aside
        class="fixed top-0 left-3 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  mt-4 items-center text-center"
        // aria-label="Sidenav"
        // id="drawer-navigation"
      >
        <div class="overflow-y-auto py-5 px-3 h-full bg-white items-center ">
          <div class="space-y-2 items-center ">
            <ClockCircleTwoTone />
            <span class="ml-3 text-md font-bold  text-gray-900 rounded-lg  group">
              From - To
            </span>

            <RangePicker
              showTime={{ format: "HH" }}
              format={"MMM DD YYYY / HH:00"}
              className="flex flex-col gap-2 "
              size="large"
              defaultValue={[dayjs(fromDate), dayjs(toDate)]}
              onChange={handleDataChange}
            />
            <div className="items-center flex">
              <FmdGoodIcon color="primary" />
              <span class="ml-3 text-md font-bold  text-gray-900 rounded-lg  group">
                Select Pickup Location
              </span>
            </div>
            <Select
              size="large"
              className="flex flex-col gap-2 "
              showSearch
              placeholder="Select a pickup location"
              optionFilterProp="children"
              //   onChange={(value) => {
              //     setSelectedPickupLocation(value);
              //   }}
              defaultValue={selectedPickupLocation}
              filterOption={filterOption}
              options={pickupLocationOptions}
            />

            <div>
              <Space direction="vertical" className="w-full">
                {filters.map((filter) => (
                  <Dropdown
                    key={filter.key}
                    trigger={["click"]}
                    overlay={
                      <FilterDropdown
                        filter={filter}
                        selectedValues={selectedFilters[filter.key]}
                        onChange={handleFilterChange}
                      />
                    }
                  >
                    <Button
                      icon={filter.icon}
                      size="large"
                      className="w-full items-center  text-center mt-2 "
                    >
                      {filter.label}
                    </Button>
                  </Dropdown>
                ))}
              </Space>
            </div>
          </div>

          <div>
            <button
              onClick={filterCars}
              className="flex mx-auto text-white font-bold border rounded-lg bg-gray-500 hover:bg-gray-900 p-3 mt-4"
            >
              Filter Cars
            </button>
          </div>
        </div>
      </aside>
      <div class="p-10 md:ml-64 h-20 pt-20 ">
        <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <CarCard cars={cars} />
          <CarCard cars={cars} />
        </div>
      </div>
    </div>
  );
}

export default FilteredCarsPage;
