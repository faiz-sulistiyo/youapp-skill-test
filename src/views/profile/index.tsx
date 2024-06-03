"use client"
import React from "react"
import {useProfileHook} from "./hook"
import LoadingOverlay from "@/components/LoadingOverlay"
import {
  EditCard,
  Header,
  InputChip,
  InputText,
  SelectOption,
} from "@/components"
import {IoAdd} from "react-icons/io5"
import {calculateAge, getHoroscopeAndZodiac} from "@/lib/utils"
import Image from "next/image"

const ProfileView = () => {
  const {data, method} = useProfileHook()
  return (
    <>
      <Header name={data.profile?.name} />
      <div className="flex flex-col gap-6 p-2">
        <LoadingOverlay isLoading={data.isLoading} />
        <div className="relative h-48 bg-primary-2 rounded-2xl overflow-hidden">
          {data.profile.image && (
            <Image
              src={data.profile.image}
              alt="profile-image"
              fill
              style={{objectFit: "cover"}}
            />
          )}
          <div className="flex flex-col gap-2 absolute left-3 bottom-4">
            <div className=" text-sm font-bold">
              @{data.profile?.name},{" "}
              <span>{calculateAge(data.profile?.birthday ?? "")}</span>
            </div>
            <span>{data.profile.gender}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4.5 text-sm text-gray-4">
          <EditCard
            title="About"
            emptyText="Add in your your to help others know you better"
            isEmpty={data.isAboutEmpty}
            isEdit={data.isEditAbout}
            onClickSave={() => {
              method.handleEditAbout()
              method.updateProfile()
            }}
            onClickEdit={method.handleEditAbout}
          >
            {data.isEditAbout ? (
              <div className="flex flex-col">
                <div className="flex gap-4 items-center my-7">
                    <button
                      className="p-5 bg-primary-2 relative rounded-xl overflow-hidden"
                      type="button"
                      onClick={method.handleOpenFile}
                    >
                                          {data.profile.image && (
                      <Image
                        src={data.profile.image}
                        alt="profile-image"
                        fill
                        style={{objectFit: "cover"}}
                      />
                    )}
                      <IoAdd size={20} />
                    </button>
                  <label htmlFor="image" className="font-medium">
                    Add Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    hidden
                    ref={data.inputFileRef}
                    onChange={method.handleUploadFile}
                    accept="*/images"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center flex-1">
                    <label htmlFor="displayname" className="flex-shrink-0 w-32">
                      Display name:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      onChange={(val) =>
                        method.handleOnChangeInputText(val, "name")
                      }
                      value={data.profile?.name ?? ""}
                      name="displayname"
                      className="border border-gray-4 py-2.5 px-5 text-right"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="Gender" className="flex-shrink-0 w-32">
                      Gender:
                    </label>
                    <SelectOption
                      options={[
                        {label: "Male", value: "male"},
                        {label: "Female", value: "female"},
                      ]}
                      onChange={(e) => {
                        console.log(e.currentTarget.value)
                        method.handleOnChangeInputText(
                          e.currentTarget.value,
                          "gender",
                        )
                      }}
                      name="gender"
                      className="border border-gray-4 text-white py-2.5 pl-5 pr-8 text-right"
                      style={{appearance: "none"}}
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="birthday" className="flex-shrink-0 w-32">
                      Birthday:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      onChange={(val) =>
                        method.handleOnChangeInputText(val, "birthday")
                      }
                      value={data.profile.birthday}
                      name="birthday"
                      type="date"
                      placeholder="dd/mm/yyy"
                      className="border border-gray-4 py-2.5 px-5 appearance-none dark:[color-scheme:dark] text-right"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="horoscope" className="flex-shrink-0 w-32">
                      Horoscope:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      value={
                        getHoroscopeAndZodiac(data.profile?.birthday ?? "")
                          .westernZodiac ?? ""
                      }
                      name="horoscope"
                      readOnly
                      className="border border-gray-4 py-2.5 px-5 text-right"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="zodiac" className="flex-shrink-0 w-32">
                      Zodiac:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      value={
                        getHoroscopeAndZodiac(data.profile?.birthday ?? "")
                          .chineseZodiac ?? ""
                      }
                      name="zodiac"
                      readOnly
                      className="border border-gray-4 py-2.5 px-5 text-right"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="height" className="flex-shrink-0 w-32">
                      Height:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      onChange={(val) =>
                        method.handleOnChangeInputText(val, "height")
                      }
                      value={data.profile?.height.toString() || ""}
                      name="height"
                      placeholder="Add Height"
                      prefix="cm"
                      className="border border-gray-4 py-2.5 px-5 text-right"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <label htmlFor="height" className="flex-shrink-0 w-32">
                      Weight:
                    </label>
                    <InputText
                      inputClassname="text-right"
                      onChange={(val) =>
                        method.handleOnChangeInputText(val, "weight")
                      }
                      value={data.profile?.weight.toString() || ""}
                      name="weight"
                      prefix="kg"
                      placeholder="Add Weight"
                      className="border border-gray-4 py-2.5 px-5 text-right"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-6 font-medium">
                <div className="flex">
                  <span>Birthday:</span>
                  <span className="text-white">
                    &nbsp;{data.profile?.birthday}
                  </span>
                </div>

                <div className="flex">
                  <span>Horoscope:</span>
                  <span className="text-white">
                    &nbsp;{data.profile?.horoscope}
                  </span>
                </div>

                <div className="flex">
                  <span>Zodiac:</span>
                  <span className="text-white">
                    &nbsp;{data.profile?.zodiac}
                  </span>
                </div>

                <div className="flex">
                  <span>Height:</span>
                  <span className="text-white">
                    &nbsp;{data.profile?.height + "cm"}
                  </span>
                </div>

                <div className="flex">
                  <span>Weight:</span>
                  <span className="text-white">
                    &nbsp;{data.profile?.weight + "kg"}
                  </span>
                </div>
              </div>
            )}
          </EditCard>

          <EditCard
            title="Interest"
            emptyText="Add in your interest to find a better match"
            isEmpty={data.isInterestEmpty}
            isEdit={false}
            onClickSave={() => {}}
            onClickEdit={method.handleEditInterest}
          >
            <div className="mt-6 flex gap-2 flex-wrap">
              {data.profile?.interests.map((interest, index) => {
                return (
                  <span
                    key={index}
                    className="bg-white text-white rounded-full w-fit bg-opacity-5 py-2 px-4"
                  >
                    {interest}
                  </span>
                )
              })}
            </div>
          </EditCard>
        </div>

        {/* Add Interest Overlay */}
        {data.isEditInterest && (
          <div className="w-full h-screen fixed bg-gray-700 left-0 top-0 bg-primary-gradient">
            <Header
              onClickBack={method.handleEditInterest}
              rightClassname="flex-none"
              rightButton={
                <button
                  onClick={() => {
                    method.handleEditInterest()
                    method.updateProfile()
                  }}
                  className="bg-gradient-blue text-end text-transparent bg-clip-text"
                >
                  Save
                </button>
              }
            />

            <div className="px-9 flex flex-col gap-3 mt-16">
              <h2 className="text-sm font-bold bg-gradient-gold text-transparent bg-clip-text">
                Tell everyone about yourself
              </h2>
              <h1 className="text-xl font-bold mb-6">What interest you?</h1>
              <InputChip
                value={data.profile?.interests ?? []}
                onChange={method.handleOnChangeChip}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileView
