import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import "../AdminDashboard/components/sidebar/sidebar.css";
import { DatePicker, Radio, Select, Slider } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SettingsIcon from "@mui/icons-material/Settings";
import { ClockCircleTwoTone, CarTwoTone } from "@ant-design/icons";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Button, Space, Checkbox, Menu, Dropdown } from "antd";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function filterCars() {
    axios.post("/filteredCars", selectedFilters).then((response) => {
      //   console.log(selectedFilters);
      setCars(response.data);
      setIsLoading(false);
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
    setIsLoading(false);
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
      key: "gearbox",
      label: "Gearbox",
      options: ["Automatic", "Manual"],
      icon: <SettingsIcon />,
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

  const handlePriceChange = (value) => {
    setSelectedPrice(value.target.value);
    setSelectedFilters({ ...selectedFilters, price: value.target.value });
    // console.log(selectedFilters);
  };
  const handleSeatsChange = (value) => {
    setSelectedSeats(value.target.value);
    setSelectedFilters({ ...selectedFilters, seats: value.target.value });
    // console.log(selectedFilters);
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
    setFromDate(fromDate);
    setToDate(toDate);
    setSelectedFilters({
      ...selectedFilters,
      fromDate: fromDate,
      toDate: toDate,
    });
  }
  function resetFilters() {
    setSelectedPrice(null);
    setSelectedSeats(null);
    setSelectedFilters({
      fuel: [],
      type: [],
      seats: [],
      price: [],
      gearbox: [],
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
    gearbox: [],
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
      <div
        className="fixed top-20 left-10 z-40  shadow-2xl shadow-cyan-950 h-fit  my-4 md:translate-x-0 items-center text-center lg:transition-transform lg:-translate-x-full w-[280px] max-sm:relative max-sm:mx-auto max-sm:left-0"
        // class="fixed top-0 left-3 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0  mt-4 items-center text-center"
        // aria-label="Sidenav"
        // id="drawer-navigation"
      >
        <div class="overflow-y-auto py-5 px-3 h-full shadow-2xl items-center border rounded-xl">
          <div class="space-y-2 items-center">
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
                <Dropdown
                  placement="top"
                  key="Price"
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Radio.Group
                        value={selectedPrice}
                        onChange={handlePriceChange}
                        className="w-full"
                      >
                        <Menu.Item key="30">
                          <Radio value="30">&lt;30$</Radio>
                        </Menu.Item>
                        <Menu.Item key="3060">
                          <Radio value="3060">30$-60$</Radio>
                        </Menu.Item>
                        <Menu.Item key="60100">
                          <Radio value="60100">60$-100$</Radio>
                        </Menu.Item>
                        <Menu.Item key="100">
                          <Radio value="100">100$&gt;</Radio>
                        </Menu.Item>
                      </Radio.Group>
                    </Menu>
                  }
                >
                  <Button
                    size="large"
                    icon={<AttachMoneyIcon />}
                    className="w-full items-center text-center mt-2 "
                  >
                    Price
                  </Button>
                </Dropdown>
                <Dropdown
                  key="Seats"
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Radio.Group
                        value={selectedSeats}
                        onChange={handleSeatsChange}
                        className="w-full"
                      >
                        <Menu.Item key="2">
                          <Radio value="2">2</Radio>
                        </Menu.Item>
                        <Menu.Item key="5">
                          <Radio value="5">5</Radio>
                        </Menu.Item>
                        <Menu.Item key="7">
                          <Radio value="7">7</Radio>
                        </Menu.Item>
                        <Menu.Item key="8">
                          <Radio value="8">7+</Radio>
                        </Menu.Item>
                      </Radio.Group>
                    </Menu>
                  }
                >
                  <Button
                    size="large"
                    icon={<GroupIcon />}
                    className="w-full items-center text-center mt-2 "
                  >
                    Seats
                  </Button>
                </Dropdown>
              </Space>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={filterCars}
              className="flex mx-auto text-white font-bold border rounded-lg bg-cyan-950 hover:bg-gray-900 p-3 mt-4"
            >
              Filter Cars
            </button>
            <button
              onClick={resetFilters}
              className="flex mx-auto text-white font-bold border rounded-lg bg-red-500 hover:bg-gray-900 p-3 mt-4"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="w-full mx-auto flex justify-center my-5 ">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 54,
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <div class="p-10 md:ml-64 h-20 pt-20 mt-4">
            <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 h-full mb-4 mx-10 max-sm:w-full max-sm:mx-auto">
              <CarCard cars={cars} fromDate={fromDate} toDate={toDate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilteredCarsPage;
